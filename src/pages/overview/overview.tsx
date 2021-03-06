import {
  Button,
  ButtonType,
  ButtonVariant,
  Grid,
  GridItem,
  Title,
  TitleSize,
} from '@patternfly/react-core';
import { Providers } from 'api/providers';
import { TabData, Tabs } from 'components/tabs';
import React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { createMapStateToProps, FetchStatus } from 'store/common';
import { providersSelectors } from 'store/providers';
import { uiActions } from 'store/ui';
import { getTestProps, testIds } from 'testIds';
import AwsDashboard from '../awsDashboard';
import OcpDashboard from '../ocpDashboard';
import { EmptyState } from './emptyState';

export const enum OverviewTab {
  aws = 'aws',
  ocp = 'ocp',
}

type OverviewOwnProps = RouteComponentProps<{}> & InjectedTranslateProps;

interface OverviewStateProps {
  availableTabs?: OverviewTab[];
  currentTab?: OverviewTab;
  providers: Providers;
  providersFetchStatus: FetchStatus;
}

interface OverviewDispatchProps {
  openProvidersModal: typeof uiActions.openProvidersModal;
}

type OverviewProps = OverviewOwnProps &
  OverviewStateProps &
  OverviewDispatchProps;

class OverviewBase extends React.Component<OverviewProps> {
  public state = {
    currentTab: OverviewTab.aws,
  };

  private getTabTitle = (tab: OverviewTab) => {
    const { t } = this.props;

    if (tab === OverviewTab.aws) {
      return t('overview.aws');
    } else if (tab === OverviewTab.ocp) {
      return t('overview.ocp');
    }
  };

  private renderTab = (tabData: TabData) => {
    const currentTab = tabData.id as OverviewTab;

    if (currentTab === OverviewTab.aws) {
      return <AwsDashboard />;
    } else {
      return <OcpDashboard />;
    }
  };

  private handleTabChange = (tabId: OverviewTab) => {
    this.setState({ currentTab: tabId });
  };

  public render() {
    const {
      availableTabs,
      openProvidersModal,
      providers,
      providersFetchStatus,
      t,
    } = this.props;
    const { currentTab } = this.state;
    const addSourceBtn = (
      <Button
        {...getTestProps(testIds.providers.add_btn)}
        onClick={openProvidersModal}
        type={ButtonType.submit}
        variant={ButtonVariant.secondary}
      >
        {t('providers.add_source')}
      </Button>
    );

    return (
      <div className="pf-l-page__main-section pf-u-pb-xl pf-u-px-xl">
        <header className="pf-u-display-flex pf-u-justify-content-space-between pf-u-align-items-center">
          <Title size={TitleSize.lg}>{t('overview.title')}</Title>
          {addSourceBtn}
        </header>
        <div>
          {Boolean(
            providers &&
              providers.count > 0 &&
              providersFetchStatus === FetchStatus.complete
          ) ? (
            <Tabs
              isShrink={Boolean(true)}
              tabs={availableTabs.map(tab => ({
                id: tab,
                label: this.getTabTitle(tab),
                content: this.renderTab,
              }))}
              selected={currentTab}
              onChange={this.handleTabChange}
            />
          ) : (
            <Grid gutter="lg">
              <GridItem>
                <EmptyState
                  primaryAction={addSourceBtn}
                  title={t('overview.empty_state_title')}
                  subTitle={t('overview.empty_state_desc')}
                />
              </GridItem>
            </Grid>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = createMapStateToProps<
  OverviewOwnProps,
  OverviewStateProps
>(state => {
  const availableTabs = [];
  const providers = providersSelectors.selectProviders(state);

  if (providers && providers.results) {
    let showAWSTab = false;
    let showOCPTab = false;
    for (const result of providers.results) {
      if (result.type === 'AWS') {
        showAWSTab = true;
      } else if (result.type === 'OCP') {
        showOCPTab = true;
      }
    }
    if (showAWSTab) {
      availableTabs.push(OverviewTab.aws);
    }
    if (showOCPTab) {
      availableTabs.push(OverviewTab.ocp);
    }
  }

  return {
    availableTabs,
    providers,
    providersFetchStatus: providersSelectors.selectProvidersFetchStatus(state),
  };
});

const Overview = translate()(
  connect(
    mapStateToProps,
    {
      openProvidersModal: uiActions.openProvidersModal,
    }
  )(OverviewBase)
);

export default Overview;
