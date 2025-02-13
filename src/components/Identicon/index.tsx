import React, {useEffect, useRef} from 'react';

import Jazzicon from 'jazzicon';
import bs58 from 'bs58';
import './style.less';
import {PublicKey} from '@solana/web3.js';

export const Identicon = (props: {
  address?: string | PublicKey;
  style?: React.CSSProperties;
  className?: string;
}) => {
  const {style, className} = props;
  const address =
    typeof props.address === 'string'
      ? props.address
      : props.address?.toBase58();
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    if (address && ref.current) {
      ref.current.innerHTML = '';
      ref.current.className = className || '';
      ref.current.appendChild(
        Jazzicon(
          style?.width || 16,
          parseInt(bs58.decode(address).toString('hex').slice(5, 15), 16),
        ),
      );
    }
  }, [address, style, className]);

  return (
    <div className="identicon-wrapper" ref={ref as any} style={props.style} />
  );
};
