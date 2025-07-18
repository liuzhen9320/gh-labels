const colors = {
    // Priority - Red to green gradient system
    'Priority: Critical': 'b60205',    // Deep red - highest priority
    'Priority: High': 'd93f0b',        // Orange-red - high priority
    'Priority: Medium': 'fbca04',      // Yellow - medium priority
    'Priority: Low': '0e8a16',         // Green - low priority

    // Status - Semantic colors
    'Status: Open': '28a745',          // Green - open status
    'Status: In Progress': '007bff',   // Blue - in progress
    'Status: Review Needed': 'ffc107', // Yellow - needs review
    'Status: Blocked': 'dc3545',       // Red - blocked
    'Status: On Hold': '6c757d',       // Gray - on hold
    'Status: Closed': '6f42c1',        // Purple - closed
    'Status: Abandoned': '343a40',     // Dark gray - abandoned
    'Status: Proposal': 'd4c5f9',      // Light purple - proposal

    // Type - Different color schemes for distinction
    'Type: Bug': 'dc3545',             // Red - bug
    'Type: Feature': '28a745',         // Green - new feature
    'Type: Enhancement': '007bff',     // Blue - enhancement
    'Type: Documentation': '6610f2',   // Purple - documentation
    'Type: Maintenance': 'fd7e14',     // Orange - maintenance
    'Type: Question': 'e83e8c',        // Pink - question
    'Type: Task': '20c997',            // Teal - task

    // Area - Soft tones for technical domains
    'Area: Frontend': '17a2b8',        // Cyan-blue - frontend
    'Area: Backend': '6610f2',         // Purple - backend
    'Area: Database': '20c997',        // Teal - database
    'Area: DevOps': 'fd7e14',          // Orange - DevOps
    'Area: API': '007bff',             // Blue - API
    'Area: UI/UX': 'e83e8c',           // Pink - UI/UX design
    'Area: Testing': '6c757d',         // Gray - testing

    // Technical debt and quality
    'Code Quality': '6610f2',          // Purple - code quality
    'Performance': '17a2b8',           // Cyan-blue - performance
    'Security': 'dc3545',              // Red - security
    'Accessibility': '28a745',         // Green - accessibility
    'Refactoring': 'fd7e14',           // Orange - refactoring

    // Community and contribution
    'good first issue': '7057ff',      // Bright purple - beginner friendly
    'help wanted': '008672',           // Deep teal - help wanted
    'hacktoberfest': 'ff6b35',         // Orange - hacktoberfest

    // Dependencies and compatibility
    'Dependencies': '0366d6',          // Deep blue - dependencies
    'Breaking Change': 'b60205',       // Deep red - breaking change
    'Backwards Compatible': '28a745',  // Green - backwards compatible
    'Version: Major': 'dc3545',        // Red - major version
    'Version: Minor': 'ffc107',        // Yellow - minor version
    'Version: Patch': '28a745',        // Green - patch version

    // Special markers
    'Duplicate': 'cfd3d7',             // Light gray - duplicate
    'Invalid': 'e4e669',               // Light yellow - invalid
    'Wontfix': 'ffffff',               // White - won't fix
    'Needs Investigation': 'fef2c0',   // Light yellow - needs investigation
    'Needs Triage': 'fbca04',          // Yellow - needs triage
    'Needs Reproduction': 'f9d0c4',    // Light orange - needs reproduction

    // Release and version control
    'Release: Alpha': '6c757d',        // Gray - alpha release
    'Release: Beta': '007bff',         // Blue - beta release
    'Release: RC': 'ffc107',           // Yellow - release candidate
    'Release: Stable': '28a745',       // Green - stable release
    'Release: Hotfix': 'dc3545',       // Red - hotfix

    // Platform and environment
    'Platform: Web': '17a2b8',         // Cyan-blue - web platform
    'Platform: Mobile': '6610f2',      // Purple - mobile platform
    'Platform: Desktop': '20c997',     // Teal - desktop platform
    'Environment: Production': 'dc3545', // Red - production environment
    'Environment: Staging': 'ffc107',  // Yellow - staging environment
    'Environment: Development': '28a745', // Green - development environment
};

/**
 * GitHub Labels
 * @param {Object} opts - Configuration options
 * @param {string} opts.username - GitHub username
 * @param {string} opts.repo - Repository name
 * @param {string} opts.token - GitHub access token
 * @param {string} [opts.userAgent] - User agent string
 * @param {boolean} [opts.cleanExisting] - Whether to clean existing labels first
 * @returns {Promise<void>}
 */
async function ghLabels(opts) {
    const {
        username,
        repo,
        token,
        userAgent = 'gh-labels/1.0.0',
        cleanExisting = true
    } = opts;

    if (!username || !repo || !token) {
        throw new Error('Missing required parameters: username, repo, and token are required');
    }

    const baseURL = `https://api.github.com/repos/${username}/${repo}/labels`;
    const headers = {
        'Authorization': `token ${token}`,
        'User-Agent': userAgent,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
    };

    try {
        console.log('🔍 Fetching existing labels...');
        const existingLabels = await getLabels(baseURL, headers);

        if (cleanExisting) {
            console.log('🗑️ Cleaning existing labels...');
            await cleanLabels(existingLabels, baseURL, headers);
        }

        console.log('✨ Creating new labels...');
        await createLabels(baseURL, headers);

        console.log('✅ All labels have been successfully created!');
    } catch (error) {
        console.error('❌ Operation failed:', error.message);
        throw error;
    }
}

/**
 * Fetch existing labels from repository
 */
async function getLabels(baseURL, headers) {
    try {
        const response = await fetch(baseURL, { headers });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`Failed to fetch labels: ${response.status} ${errorData.message || response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        if (error.message.includes('Failed to fetch')) {
            throw new Error(`Network error: ${error.message}`);
        }
        throw error;
    }
}

/**
 * Clean existing labels from repository
 */
async function cleanLabels(labels, baseURL, headers) {
    if (!labels || labels.length === 0) {
        console.log('No labels to clean');
        return;
    }

    const deletePromises = labels.map(async (label) => {
        try {
            const response = await fetch(`${baseURL}/${encodeURIComponent(label.name)}`, {
                method: 'DELETE',
                headers
            });

            if (response.ok) {
                console.log(`🗑️ Deleted label: ${label.name}`);
            } else if (response.status === 404) {
                console.log(`⚠️ Label not found: ${label.name}`);
            } else {
                const errorData = await response.json().catch(() => ({}));
                console.error(`❌ Failed to delete label ${label.name}: ${errorData.message || response.statusText}`);
            }
        } catch (error) {
            console.error(`❌ Error deleting label ${label.name}:`, error.message);
            throw error;
        }
    });

    // Process deletions with some delay to avoid rate limiting
    const batchSize = 5;
    for (let i = 0; i < deletePromises.length; i += batchSize) {
        const batch = deletePromises.slice(i, i + batchSize);
        await Promise.all(batch);

        // Add a small delay between batches
        if (i + batchSize < deletePromises.length) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }
}

/**
 * Create new labels in repository
 */
async function createLabels(baseURL, headers) {
    const labelNames = Object.keys(colors);

    const createPromises = labelNames.map(async (name) => {
        try {
            const labelData = {
                name: name,
                color: colors[name],
                description: getDefaultDescription(name)
            };

            const response = await fetch(baseURL, {
                method: 'POST',
                headers,
                body: JSON.stringify(labelData)
            });

            if (response.ok) {
                console.log(`✨ Created label: ${name}`);
            } else if (response.status === 422) {
                console.log(`⚠️ Label already exists: ${name}`);
            } else {
                const errorData = await response.json().catch(() => ({}));
                console.error(`❌ Failed to create label ${name}: ${errorData.message || response.statusText}`);
                throw new Error(`Failed to create label ${name}: ${response.status}`);
            }
        } catch (error) {
            console.error(`❌ Error creating label ${name}:`, error.message);
            throw error;
        }
    });

    // Process creations with some delay to avoid rate limiting
    const batchSize = 5;
    for (let i = 0; i < createPromises.length; i += batchSize) {
        const batch = createPromises.slice(i, i + batchSize);
        await Promise.all(batch);

        // Add a small delay between batches
        if (i + batchSize < createPromises.length) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }
}

/**
 * Get default description for a label
 */
function getDefaultDescription(name) {
    return name.toLowerCase().replace(/[^a-z0-9]/g, ' ').trim() || '';
}

// Support both Promise and callback patterns for backward compatibility
function ghLabelsWrapper(opts, cb) {
    if (typeof cb === 'function') {
        // Callback style (backward compatibility)
        ghLabels(opts)
            .then(() => cb())
            .catch(cb);
    } else {
        // Promise style
        return ghLabels(opts);
    }
}

module.exports = ghLabelsWrapper;