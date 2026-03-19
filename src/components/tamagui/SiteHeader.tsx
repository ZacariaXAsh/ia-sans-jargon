import { styled } from '@tamagui/core';
import TamaguiRoot from './TamaguiRoot';
import { PrimaryLink, Shell } from './primitives';

const HeaderWrap = styled.header({
  paddingTop: '$4',
  paddingBottom: '$4',
});

const NavShell = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '$4',
  padding: '$4',
  borderRadius: '$5',
  borderWidth: 1,
  borderColor: '$border',
  backgroundColor: '$surface',
  boxShadow: 'var(--shadow-soft)',
  $md: {
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
});

const BrandLink = styled.a({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '$3',
  color: '$color',
  fontWeight: '800',
  textDecorationLine: 'none',
});

const BrandMark = styled.span({
  display: 'grid',
  placeItems: 'center',
  width: '2.4rem',
  height: '2.4rem',
  borderRadius: '16px',
  borderWidth: 1,
  borderColor: '$primaryHover',
  backgroundColor: '$primary',
  color: '$primaryForeground',
  fontSize: '0.82rem',
  fontWeight: '900',
  letterSpacing: '0.08em',
});

const Nav = styled.nav({
  display: 'inline-flex',
  flexWrap: 'wrap',
  gap: '$2',
});

const NavLink = styled.a({
  display: 'inline-flex',
  alignItems: 'center',
  width: 'fit-content',
  px: '$4',
  py: '$3',
  borderRadius: '$6',
  textDecorationLine: 'none',
  color: '$colorMuted',
  fontWeight: '700',
  transition: 'background 0.18s ease, color 0.18s ease, transform 0.18s ease',
  hoverStyle: {
    transform: 'translateY(-1px)',
    backgroundColor: '$surfaceStrong',
    color: '$color',
  },
  variants: {
    active: {
      true: {
        backgroundColor: '$primarySoft',
        color: '$color',
      },
    },
  },
});

const CtaWrap = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
});

type Props = {
  currentPath?: string;
};

const links = [
  { href: '/', label: 'Accueil' },
  { href: '/articles/', label: 'Articles' },
  { href: '/glossaire/', label: 'Glossaire' },
];

export default function SiteHeader({ currentPath = '/' }: Props) {
  return (
    <TamaguiRoot>
      <HeaderWrap>
        <Shell>
          <NavShell>
            <BrandLink href="/">
              <BrandMark>IA</BrandMark>
              <span>IA, sans jargon</span>
            </BrandLink>

            <Nav aria-label="Navigation principale">
              {links.map((link) => (
                <NavLink key={link.href} href={link.href} active={currentPath === link.href}>
                  {link.label}
                </NavLink>
              ))}
            </Nav>

            <CtaWrap>
              <PrimaryLink href="/#rester-au-courant">Recevoir les prochains guides</PrimaryLink>
            </CtaWrap>
          </NavShell>
        </Shell>
      </HeaderWrap>
    </TamaguiRoot>
  );
}
