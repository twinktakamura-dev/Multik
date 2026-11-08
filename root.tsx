import React from 'react';
import {Composition} from 'remotion';
import {PapaMultfilm} from './video';
export const RemotionRoot: React.FC = () => <Composition id="PapaMultfilm" component={PapaMultfilm} durationInFrames={5760} fps={24} width={1920} height={1080}/>;
