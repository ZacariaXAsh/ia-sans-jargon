import { styled } from '@tamagui/core';
import TamaguiRoot from './TamaguiRoot';
import { Body, Shell, Surface } from './primitives';

const FooterWrap = styled.footer({
  paddingBottom: '$9',
});

const FooterPanel = styled(Surface, {
  padding: '$6',
  backgroundColor: '$surfaceStrong',
});

const FooterGrid = styled.div({
  display: 'grid',
  gap: '$5',
  gridTemplateColumns: '1.15fr 0.7fr 1fr',
  $md: {
    gridTemplateColumns: '1fr',
  },
});

const Brand = styled.p({
  margin: 0,
  color: '$color',
  fontFamily: 'var(--font-heading)',
  fontSize: '1.25rem',
  fontWeight: '800',
  lineHeight: 1.05,
});

const SmallTitle = styled.p({
  margin: 0,
  color: '$color',
  fontWeight: '800',
});

const LinkList = styled.ul({
  margin: 0,
  paddingLeft: '1rem',
  color: '$colorMuted',
  display: 'grid',
  gap: '$2',
});

const FooterLink = styled.a({
  color: '$color',
  fontWeight: '700',
  textDecorationLine: 'none',
  hoverStyle: {
    color: '$accent',
  },
});

export default function SiteFooter() {
  return (
    <TamaguiRoot>
      <FooterWrap>
        <Shell>
          <FooterPanel>
            <FooterGrid>
              <div>
                <Brand>IA, sans jargon</Brand>
                <Body>
                  Un site pour comprendre l’IA avec des mots simples, des exemples ordinaires et des repères utiles — sans pression pour “faire expert”.
                </Body>
              </div>

              <div>
                <SmallTitle>Explorer</SmallTitle>
                <LinkList>
                  <li>
                    <FooterLink href="/articles/">Tous les articles</FooterLink>
                  </li>
                  <li>
                    <FooterLink href="/glossaire/">Petit glossaire</FooterLink>
                  </li>
                </LinkList>
              </div>

              <div>
                <SmallTitle>Approche</SmallTitle>
                <Body>
                  Commencer petit, vérifier avant de croire, et garder le dernier mot. Le site est pensé pour être clair avant d’être impressionnant.
                </Body>
              </div>
            </FooterGrid>
          </FooterPanel>
        </Shell>
      </FooterWrap>
    </TamaguiRoot>
  );
}
