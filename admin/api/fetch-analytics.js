import { BetaAnalyticsDataClient } from "@google-analytics/data";
export async function FetchAnalytics(dimensions, metrics, dateRanges){
  // 👇 Setting PropertyId
const propertyId = process.env.GA_PROPERTY_ID;
const analyticsDataClient = new BetaAnalyticsDataClient({
    credentials: {
        client_email: process.env.GA_CLIENT_EMAIL,
        private_key: process.env.GA_PRIVATE_KEY?.replace(/\n/gm, "\n"), // replacing is necessary
    },
});
if(!Array.isArray(dimensions)){
    dimensions = [dimensions];
}
if(!Array.isArray(metrics)){
    metrics = [metrics];
}
dimensions = dimensions.map(dimension => {
    return {
        name: dimension
    }
});
metrics = metrics.map(metric => {
    return {
        name: metric
    }
});

const [res] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [
        dateRanges
    ],
    dimensions: dimensions,
    metrics: metrics,
});
return res.rows;
}