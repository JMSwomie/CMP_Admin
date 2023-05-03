import { useSelector } from 'react-redux';
import classNames from 'classnames';

import './Footer.scss';

export const Footer = () => {
  const { theme } = useSelector((state: any) => state.theme);

  const wrapperClasses = classNames('footer', {
    'dark': theme === 'dark',
    'light': theme === 'light',
  });

  return (
    <div className={wrapperClasses}>
      <h6>
        Copyright © 2023 - 2024 SoftwareOne. All Rights
        Reserved.
      </h6>
      <p>Design by JMunoz.</p>
    </div>
  );
};
