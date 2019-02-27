import { withAppSyncData } from "next-apollo-appsync";
import AppSyncConfig from "./aws-exports";

const config = {
	url: AppSyncConfig.aws_appsync_graphqlEndpoint,
	region: AppSyncConfig.aws_appsync_region,
	auth: {
		type: AppSyncConfig.aws_appsync_authenticationType,
		apiKey: AppSyncConfig.aws_appsync_apiKey
	},
};

export default withAppSyncData(config);


// import { withAppSyncData } from 'next-apollo-appsync'
// import AppSyncConfig from './aws-exports'
//
// const config = {
//     url: 'https://6tiebuw4tfeqzcnhfhawxdlugq.appsync-api.us-east-2.amazonaws.com/graphql',
//     region: 'region=us-east-2',
//     auth: {
//         type: 'API_KEY',
//         apiKey: 'da2-gz47uxpvovdmxmhizroepnayki'
//     },
// }
//
// export default withAppSyncData(config)