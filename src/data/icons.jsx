import React from 'react';
import {
  IconCode, IconMobile, IconCloud, IconAi, IconServer, IconData,
  IconHeart, IconStar, IconDiamond,
} from '../components/ui/Icons.jsx';

/* String-keyed icon registry so project/stack icons can be stored as plain
   strings in the editable content tree (and picked in the admin). */
export const ICONS = {
  IconAi, IconData, IconMobile, IconCode, IconServer,
  IconCloud, IconDiamond, IconStar, IconHeart,
};

export const ICON_NAMES = Object.keys(ICONS);

export function Icon({ name, ...props }) {
  const Cmp = ICONS[name] || IconCode;
  return <Cmp {...props} />;
}
