import React from 'react';

import styles from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😭</span>
        <br />
        Nie ma nic
      </h1>
    </div>
  );
};

export default NotFoundBlock;
