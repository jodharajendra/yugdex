import * as React from 'react';
import './index.css';

import { widget } from '../../charting_library';

function getLanguageFromURL() {
	const regex = new RegExp('[\\?&]lang=([^&#]*)');
	const results = regex.exec(window.location.search);
	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

export default class TVChartContainer extends React.PureComponent {

	static defaultProps = {
		symbol: 'AAPL',
		interval: 'D',
		// datafeedUrl: 'https://demo_feed.tradingview.com',
		libraryPath: '/charting_library/',
		chartsStorageUrl: 'https://saveload.tradingview.com',
		chartsStorageApiVersion: '1.1',
		clientId: 'tradingview.com',
		userId: 'public_user_id',
		fullscreen: false,
		autosize: true,
		studiesOverrides: {},
	};

	tvWidget = null;

	constructor(props) {
		super(props);
		this.state = {
			chartSymbol: props.symbol
		}
		this.ref = React.createRef();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps?.symbol !== this?.state?.chartSymbol) { 
			this.setState({chartSymbol: nextProps?.symbol});
			this.getChart(nextProps?.symbol);
		}
		/* console.log(nextProps, 'nextPropsRR'); */
	};
	
	getChart = (chartSymbol) => {
		const widgetOptions = {
			symbol: chartSymbol,
			// BEWARE: no trailing slash is expected in feed URL
			datafeed: new window.Datafeeds.UDFCompatibleDatafeed('https://api2.yugdex.com'),
			interval: this.props.interval,
			container: this.ref.current,
			library_path: this.props.libraryPath,

			locale: getLanguageFromURL() || 'en',
			disabled_features: ['use_localstorage_for_settings'],
			enabled_features: ['study_templates'],
			charts_storage_url: this.props.chartsStorageUrl,
			charts_storage_api_version: this.props.chartsStorageApiVersion,
			client_id: this.props.clientId,
			user_id: this.props.userId,
			fullscreen: this.props.fullscreen,
			autosize: this.props.autosize,
			studies_overrides: this.props.studiesOverrides,
		};

		const tvWidget = new widget(widgetOptions);
		this.tvWidget = tvWidget;

		tvWidget.onChartReady(() => {
			tvWidget.headerReady().then(() => {
				const button = tvWidget.createButton();
				button.setAttribute('title', 'Click to show a notification popup');
				button.classList.add('apply-common-tooltip');
				button.addEventListener('click', () => tvWidget.showNoticeDialog({
					title: 'Notification',
					body: 'TradingView Charting Library API works correctly',
					callback: () => {
						console.log('Noticed!');
					},
				}));

				button.innerHTML = 'Check API';
			});
		});
	}

	componentDidMount() {
		this.getChart(this.props.symbol);
	}

	componentWillUnmount() {
		if (this.tvWidget !== null) {
			this.tvWidget.remove();
			this.tvWidget = null;
		}
	}

	render() {
		console.log(this.state.chartSymbol, 'this.props.symbol');
		return (

			<div
				ref={this.ref}
				className={'TVChartContainer'}
			/>
		);
	}
}
