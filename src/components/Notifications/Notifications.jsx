import React, { memo, useCallback, useRef, useState } from 'react'
import { nanoid } from 'nanoid'
import { BsCheckLg } from 'react-icons/bs'
import { MdClose } from 'react-icons/md'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import styles from "./Notifications.module.scss";

export const TIMEOUT = 5000;
export const ANIMATION_DURATION = 400;
const MAX_NOTIFICATIONS = 5;
const STACKING_OVERLAP = 0.9;
const NOTIFICATION_ICON = {
    success: BsCheckLg,
};

export const useNotifications = (callback, deps) => {
    const timeouts = useRef([]);
    const paused = useRef(null);
    const [notifications, setNotifications] = useState([]);

    const add = useCallback((n) => {
        const notification = { ...n };
        notification.id = nanoid();
        notification.timeout += Date.now();
        setNotifications(n => {
            const next = [notification, ...n];
            if (n.length >= MAX_NOTIFICATIONS) {
                next.pop();
            }
            return next;
        });
        timeouts.current.push(setTimeout(() => {
            remove(notification.id);
        }, notification.timeout - Date.now()));
    }, []);

    const pause = useCallback(() => {
        timeouts.current.forEach(clearTimeout);
        timeouts.current = [];
        paused.current = Date.now();
    }, []);

    const resume = useCallback(() => {
        setNotifications(n => {
            return n.map(notification => {
                notification.timeout += Date.now() - paused.current;
                timeouts.current.push(setTimeout(() => {
                    remove(notification.id);
                }, notification.timeout - Date.now()));
                return notification;
            });
        });
    }, [notifications]);

    const remove = useCallback((id) => {
        setNotifications(n => n.filter(n => n.id !== id));
    }, []);

    const props = { notifications, remove, pause, resume };

    return { props, add };
};

const Notification = memo(({ id, title, content, type, index, total, remove }) => {
    const Icon = NOTIFICATION_ICON[type];
    const inverseIndex = total - index - 1;
    const scale = 1 - inverseIndex * 0.05;
    const opacity = 1 - (inverseIndex / total) * 0.1;
    const bg = `hsl(0 0% ${100 - inverseIndex * 15}% / 40%)`;
    const y = inverseIndex * 100 * STACKING_OVERLAP;

    return (
        <div
            className={styles.notification}
            style={{'--bg': bg, '--opacity': opacity, '--scale': scale, '--y': `${y}%`}}>
            <div className={styles.notificationInner}>
                <div className={styles.icon + ' ' + type}>
                    <Icon/>
                </div>
                <div>
                    <h2>{title}</h2>
                    <p>{content}</p>
                </div>
                <button className={styles.close} onClick={() => remove(id)}><MdClose/></button>
            </div>
        </div>
    );
});

export const Notifications = ({ notifications, remove, pause, resume, animationDuration }) => {
    return (
        <TransitionGroup className={styles.notifications} style={{ '--duration': `${animationDuration}ms` }} onMouseEnter={pause} onMouseLeave={resume}>
            {[...notifications].reverse().map((notification, index) => (
                <CSSTransition key={notification.id} timeout={animationDuration}>
                    <Notification
                        {...notification}
                        remove={remove}
                        index={index}
                        total={notifications.length}/>
                </CSSTransition>
            ))}
        </TransitionGroup>
    );
}
