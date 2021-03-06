import { shallow } from 'enzyme';
import React from 'react';
import {
  OcpReportSummaryDetails,
  OcpReportSummaryDetailsProps,
} from './ocpReportSummaryDetails';

const props: OcpReportSummaryDetailsProps = {
  report: { data: [], total: { charge: 100, units: 'USD' } },
  label: 'label',
  formatValue: jest.fn(() => 'formatedValue'),
};

test('report total is formated', () => {
  const view = shallow(<OcpReportSummaryDetails {...props} />);
  expect(props.formatValue).toBeCalledWith(
    props.report.total.charge,
    props.report.total.units,
    props.formatOptions
  );
  expect(view).toMatchSnapshot();
});

test('defaults value if report is not present', () => {
  const view = shallow(<OcpReportSummaryDetails {...props} report={null} />);
  expect(props.formatValue).not.toBeCalled();
  expect(view).toMatchSnapshot();
});

test('defaults value if report.total is not present', () => {
  const view = shallow(
    <OcpReportSummaryDetails
      {...props}
      report={{ ...props.report, total: null }}
    />
  );
  expect(props.formatValue).not.toBeCalled();
  expect(view).toMatchSnapshot();
});
