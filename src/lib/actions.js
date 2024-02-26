export async function fetchApplications() {
	const response = await fetch('https://engineering-task.elancoapps.com/api/applications');
	return await response.json();
}

export async function fetchApplicationData(applicationName) {
	const response = await fetch(`https://engineering-task.elancoapps.com/api/applications/${applicationName}`);
	return await response.json();
}


export async function GetHighestCostApplication() {
    const response = await fetch('https://engineering-task.elancoapps.com/api/raw'); // Getting all;
    const data = await response.json();

    const costByApp = data.reduce((acc, entry) => {
        const appName = entry.Tags['app-name'];
        const cost = parseFloat(entry.ConsumedQuantity) * parseFloat(entry.Cost);
        if (appName in acc) {
            acc[appName] += cost;
        } else {
            acc[appName] = cost;
        }
        return acc;
    }, {}); // Corrected syntax here

    const mostExpensiveApp = Object.keys(costByApp).reduce((a, b) => costByApp[a] > costByApp[b] ? a : b);
    const mostExpensiveCost = costByApp[mostExpensiveApp];

    return { mostExpensiveApp, mostExpensiveCost };
}

