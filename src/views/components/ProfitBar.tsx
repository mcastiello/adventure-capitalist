import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { getDelayValue } from '../../helpers';
import { ProfitBarProps } from '../GameProps';

const ANIMATION_CLASS = 'progress-animation';

const ProgressBarContainer = styled.div`
  position: relative;
  height 4px;
  border-radius: 3px;
  background: grey;
  width: calc(100% - 130px);
`;

const ProgressBar = styled.div`
  display: block;
  position: absolute;
  height 4px;
  border-radius: 3px;
  width: 100%;
  background: green;
  
  &.${ANIMATION_CLASS} {
    animation-name: progress;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-timing-function: linear;
  }
  
  @keyframes progress {
    0% {
      width: 0%;
      background: red;
    }
    50% {
      width: 50%;
      background: yellow;
    }
    100% {
      width: 100%;
      background: green;
    }
  }
`;

const ProfitBar: React.FC<ProfitBarProps> = ({ lastCollection, interval }) => {
  const [animationDelay, setAnimationDelay] = useState(getDelayValue(lastCollection));
  const [animationClass, setAnimationClass] = useState(ANIMATION_CLASS);
  const resetAnimationClass = useCallback(() => setAnimationClass(''), []);

  useEffect(() => {
    const delay = getDelayValue(lastCollection);
    setAnimationDelay(delay);
    if (Math.abs(delay) < interval) {
      setAnimationClass(ANIMATION_CLASS);
    } else {
      setAnimationClass('');
    }
  }, [lastCollection, interval]);

  return (
    <ProgressBarContainer>
      <ProgressBar
        className={animationClass}
        style={{
          animationDuration: `${interval}s`,
          animationDelay: `${animationDelay}s`
        }}
        onAnimationEnd={resetAnimationClass}
      />
    </ProgressBarContainer>
  );
};

export default ProfitBar;
