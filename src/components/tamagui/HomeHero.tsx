import { styled } from '@tamagui/core';
import TamaguiRoot from './TamaguiRoot';
import {
  Body,
  ButtonRow,
  CardTitle,
  DisplayTitle,
  Eyebrow,
  IconBadge,
  Lead,
  Note,
  Pill,
  PillRow,
  PrimaryLink,
  SecondaryLink,
  Shell,
  Stack,
  StrongText,
  Surface,
  WarmSurface,
} from './primitives';

const HeroWrap = styled.section({
  paddingTop: '$8',
  paddingBottom: '$8',
});

const HeroGrid = styled.div({
  display: 'grid',
  gap: '$4',
  gridTemplateColumns: 'minmax(0, 1.08fr) minmax(320px, 0.92fr)',
  alignItems: 'stretch',
  $md: {
    gridTemplateColumns: '1fr',
  },
});

const LeftPanel = styled(WarmSurface, {
  padding: '$7',
  display: 'grid',
  gap: '$5',
  backgroundColor: '$surfaceStrong',
});

const RightPanel = styled(Surface, {
  padding: '$6',
  display: 'grid',
  gap: '$4',
});

const ExampleBox = styled.div({
  display: 'grid',
  gap: '$3',
  padding: '$4',
  borderRadius: '$4',
  backgroundColor: '$backgroundSoft',
  borderWidth: 1,
  borderColor: '$border',
});

const Bubble = styled.div({
  maxWidth: '100%',
  padding: '$4',
  borderRadius: '$4',
  lineHeight: 1.6,
  borderWidth: 1,
  borderColor: '$border',
  backgroundColor: '$surface',
  color: '$color',
  variants: {
    tone: {
      user: {
        backgroundColor: '$surface',
      },
      assistant: {
        backgroundColor: '$primarySoft',
      },
    },
  },
});

const StepList = styled.div({
  display: 'grid',
  gap: '$3',
});

const StepRow = styled.div({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  gap: '$3',
  alignItems: 'start',
  padding: '$4',
  borderRadius: '$4',
  borderWidth: 1,
  borderColor: '$border',
  backgroundColor: '$surfaceStrong',
});

type Props = {
  eyebrow: string;
  title: string;
  summary: string;
  reassurance: string;
  primaryHref: string;
  secondaryHref: string;
  quickChecks: string[];
};

export default function HomeHero({
  eyebrow,
  title,
  summary,
  reassurance,
  primaryHref,
  secondaryHref,
  quickChecks,
}: Props) {
  return (
    <TamaguiRoot>
      <HeroWrap>
        <Shell>
          <HeroGrid>
            <LeftPanel>
              <Stack>
                <Eyebrow>{eyebrow}</Eyebrow>
                <DisplayTitle>{title}</DisplayTitle>
                <Lead>{summary}</Lead>
              </Stack>

              <ButtonRow>
                <PrimaryLink href={primaryHref}>Faire un test simple en 2 minutes</PrimaryLink>
                <SecondaryLink href={secondaryHref}>Voir les guides</SecondaryLink>
              </ButtonRow>

              <PillRow aria-label="Repères de départ">
                <Pill>Sans jargon inutile</Pill>
                <Pill>Premier pas facile à vérifier</Pill>
                <Pill>Vous gardez le dernier mot</Pill>
              </PillRow>

              <Note>
                <StrongText>{reassurance}</StrongText>
                <Body>Le site est pensé pour les gens normaux : peu de temps, peu de patience, envie de comprendre vite et proprement.</Body>
              </Note>
            </LeftPanel>

            <RightPanel>
              <Stack>
                <Eyebrow>Exemple banal, donc utile</Eyebrow>
                <CardTitle>Un premier usage qui aide vraiment</CardTitle>
                <Body>Pas besoin de “faire de l’IA”. Commencez par améliorer un message que vous auriez écrit de toute façon.</Body>
              </Stack>

              <ExampleBox>
                <Bubble tone="user">Réécris ce message pour qu’il soit plus clair et plus poli. Garde-le court.</Bubble>
                <Bubble tone="assistant">
                  Bonjour, je vous écris pour savoir si le dossier a bien été reçu. Merci d’avance pour votre retour.
                </Bubble>
              </ExampleBox>

              <StepList>
                {quickChecks.map((item, index) => (
                  <StepRow key={item}>
                    <IconBadge>{String(index + 1).padStart(2, '0')}</IconBadge>
                    <Body>{item}</Body>
                  </StepRow>
                ))}
              </StepList>
            </RightPanel>
          </HeroGrid>
        </Shell>
      </HeroWrap>
    </TamaguiRoot>
  );
}
