import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="-3" y="296" rx="10" ry="10" width="280" height="20" />
    <rect x="1" y="336" rx="0" ry="0" width="280" height="63" />
    <rect x="3" y="415" rx="10" ry="10" width="95" height="30" />
    <rect x="128" y="415" rx="20" ry="20" width="152" height="45" />
    <circle cx="140" cy="145" r="140" />
  </ContentLoader>
);

export default Skeleton;
