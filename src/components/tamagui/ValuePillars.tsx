import { styled } from '@tamagui/core';
import TamaguiRoot from './TamaguiRoot';
import { Body, CardTitle, Eyebrow, IconBadge, SectionTitle, Shell, Surface } from './primitives';

const Wrap = styled.section({
  paddingBottom: '$8',
});

const Band = styled(Surface, {
  padding: '$7',
  display: 'grid',
  gap: '$5',
  backgroundColor: '$surfaceStrong',
});

const Intro = styled.div({
  maxWidth: '46rem',
  display: 'grid',
  gap: '$3',
});

const Grid = styled.div({
  display: 'grid',
  gap: '$4',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  $md: {
    gridTemplateColumns: '1fr',
  },
});

const PillarCard = styled.div({
  display: 'grid',
  gap: '$3',
  padding: '$5',
  borderRadius: '$4',
  borderWidth: 1,
  borderColor: '$border',
  backgroundColor: '$surface',
  variants: {
    tone: {
      primary: {
        backgroundColor: '$primarySoft',
      },
      warm: {
        backgroundColor: '$surfaceStrong',
      },
      calm: {
        backgroundColor: '$backgroundSoft',
      },
    },
  },
});

const pillars = [
  {
    title: 'Clair',
    body: 'Une idée à la fois. Des mots simples. Et quand un terme technique apparaît, il est expliqué au lieu d’être posé comme une évidence.',
    icon: '01',
    tone: 'primary' as const,
  },
  {
    title: 'Concret',
    body: 'Chaque page doit vous aider à faire quelque chose de précis : tester, reformuler, vérifier, comparer ou éviter un piège.',
    icon: '02',
    tone: 'warm' as const,
  },
  {
    title: 'Prudent',
    body: 'On montre ce qui vaut le coup d’essayer, mais aussi ce qu’il faut relire, vérifier ou garder hors du chat.',
    icon: '03',
    tone: 'calm' as const,
  },
];

export default function ValuePillars() {
  return (
    <TamaguiRoot>
      <Wrap>
        <Shell>
          <Band>
            <Intro>
              <Eyebrow>Notre ligne</Eyebrow>
              <SectionTitle>Des repères chaleureux, utiles et tout de suite compréhensibles</SectionTitle>
              <Body>
                Ici, on préfère les blocs simples, les exemples ordinaires et les bons réflexes à l’esthétique “magazine expert”. Le but : vous rendre l’IA plus familière, pas plus intimidante.
              </Body>
            </Intro>

            <Grid>
              {pillars.map((pillar) => (
                <PillarCard key={pillar.title} tone={pillar.tone}>
                  <IconBadge>{pillar.icon}</IconBadge>
                  <CardTitle>{pillar.title}</CardTitle>
                  <Body>{pillar.body}</Body>
                </PillarCard>
              ))}
            </Grid>
          </Band>
        </Shell>
      </Wrap>
    </TamaguiRoot>
  );
}
