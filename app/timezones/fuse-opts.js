export const fuseOpts = {
    threshold: 0.2,
    distance: 100,
    keys: [
        {
            name: 'text',
            weight: 0.15
        },
        {
            name: 'abbr',
            weight: 0.15
        },
        {
            name: 'value',
            weight: 0.1
        },
        {
            name: 'utc',
            weight: 0.6
        }
    ]
}
