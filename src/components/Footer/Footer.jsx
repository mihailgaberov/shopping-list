import styles from "./footer.module.scss";
import packageJson from '../../../package.json';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
      <footer className={styles.footer} data-cy="footer">
        <ul>
          <li className={styles.footerLinks}>
            <a
                href="https://mobile.twitter.com/mihailgaberov"
                target="_blank"
                rel="noopener noreferrer"
                data-cy="twitterLink"
            >
              twitter
            </a>{" "}
            &bull;{" "}
            <a
                href="https://github.com/mihailgaberov"
                target="_blank"
                rel="noopener noreferrer"
                data-cy="githubLink"
            >
              github
            </a>
          </li>
          <li className={styles.footerCopyrights}>
            © {packageJson.author} {currentYear}. All rights reserved.
          </li>
          <li className={styles.noCookies}>
            <div className={styles.noTracking}>v.{packageJson.version}</div>
          </li>
        </ul>
      </footer>
  );
};
