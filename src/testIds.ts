export const testIdProp = 'data-testid';
export const getTestProps = (id: string) => ({ [testIdProp]: id });

export const testIds = {
  details: {
    historical_data_btn: 'historical-data-btn',
    tag_btn: 'tag-btn',
  },
  export: {
    cancel_btn: 'cancel-btn',
    submit_btn: 'submit-btn',
  },
  login: {
    alert: 'alert',
    form: 'login-form',
    username_input: 'username-input',
    password_input: 'password-input',
    submit: 'submit',
  },
  masthead: {
    masthead: 'masthead',
    username: 'username',
    sidebarToggle: 'sidebar-toggle',
    logout: 'logout',
  },
  providers: {
    add_btn: 'add-btn',
    bucket_input: 'bucket-input',
    cancel_btn: 'cancel-btn',
    empty_state_add_btn: 'empty_state_add-btn',
    name_input: 'provider-name-input',
    resource_name_input: 'provider-resource-name-input',
    cluster_id_input: 'provider-cluster-id-input',
    submit_btn: 'submit-btn',
    type_input: 'provider-type-input',
  },
  sidebar: {
    nav: 'vertical-nav',
    link: 'vertical-nav-link',
    backdrop: 'sidebar-backdrop',
  },
};
