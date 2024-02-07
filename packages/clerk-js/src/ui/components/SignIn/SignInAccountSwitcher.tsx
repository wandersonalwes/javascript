import { withRedirectToAfterSignIn } from '../../common';
import { useEnvironment, useSignInContext, useSignOutContext } from '../../contexts';
import { Col, descriptors, Flow, localizationKeys } from '../../customizables';
import { Action, Actions, Card, Header, PreviewButton, UserPreview, withCardStateProvider } from '../../elements';
import { useCardState } from '../../elements/contexts';
import { Add, SwitchArrowRight } from '../../icons';
import { SignOutAllActions } from '../UserButton/SessionActions';
import { useMultisessionActions } from '../UserButton/useMultisessionActions';

const _SignInAccountSwitcher = () => {
  const card = useCardState();
  const { userProfileUrl } = useEnvironment().displayConfig;
  const { navigateAfterSignIn, path: signInPath } = useSignInContext();
  const { navigateAfterSignOut } = useSignOutContext();
  const { handleSignOutAllClicked, handleSessionClicked, activeSessions, handleAddAccountClicked } =
    useMultisessionActions({
      navigateAfterSignOut,
      navigateAfterSwitchSession: navigateAfterSignIn,
      userProfileUrl,
      signInUrl: signInPath,
      user: undefined,
    });

  return (
    <Flow.Part part='accountSwitcher'>
      <Card.Root>
        <Card.Content sx={t => ({ padding: `${t.space.$8} ${t.space.$none} ${t.space.$none}` })}>
          <Header.Root>
            <Header.Title localizationKey={localizationKeys('signIn.accountSwitcher.title')} />
            <Header.Subtitle localizationKey={localizationKeys('signIn.accountSwitcher.subtitle')} />
          </Header.Root>
          <Card.Alert>{card.error}</Card.Alert>
          <Col
            elementDescriptor={descriptors.main}
            gap={8}
            sx={t => ({ borderTop: `${t.borders.$normal} ${t.colors.$neutralAlpha100}` })}
          >
            <Actions role='menu'>
              {activeSessions.map(s => (
                <PreviewButton
                  key={s.id}
                  onClick={handleSessionClicked(s)}
                  sx={theme => ({
                    height: theme.sizes.$16,
                    justifyContent: 'flex-start',
                    borderRadius: 0,
                    borderBottom: `${theme.borders.$normal} ${theme.colors.$neutralAlpha100}`,
                  })}
                  icon={SwitchArrowRight}
                >
                  <UserPreview
                    user={s.user}
                    sx={{
                      width: '100%',
                    }}
                  />
                </PreviewButton>
              ))}

              <Action
                elementDescriptor={descriptors.userButtonPopoverActionButton}
                elementId={descriptors.userButtonPopoverActionButton.setId('addAccount')}
                iconBoxElementDescriptor={descriptors.userButtonPopoverActionButtonIconBox}
                iconBoxElementId={descriptors.userButtonPopoverActionButtonIconBox.setId('addAccount')}
                iconElementDescriptor={descriptors.userButtonPopoverActionButtonIcon}
                iconElementId={descriptors.userButtonPopoverActionButtonIcon.setId('addAccount')}
                icon={Add}
                label={localizationKeys('userButton.action__addAccount')}
                onClick={handleAddAccountClicked}
                iconSx={t => ({
                  width: t.sizes.$9,
                  height: t.sizes.$6,
                })}
                iconBoxSx={t => ({
                  minHeight: t.sizes.$9,
                  minWidth: t.sizes.$6,
                  alignItems: 'center',
                })}
                spinnerSize='md'
              />
            </Actions>
          </Col>
        </Card.Content>
        <Card.Footer
          sx={t => ({
            '>:first-of-type': {
              padding: `${t.space.$2}`,
              width: '100%',
            },
          })}
        >
          <Card.Action
            sx={{
              width: '100%',
            }}
          >
            <SignOutAllActions handleSignOutAllClicked={handleSignOutAllClicked} />
          </Card.Action>
        </Card.Footer>
      </Card.Root>
    </Flow.Part>
  );
};
export const SignInAccountSwitcher = withRedirectToAfterSignIn(withCardStateProvider(_SignInAccountSwitcher));
