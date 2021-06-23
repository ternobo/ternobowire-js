/**
 * Check if URL is from Same Origin.
 * @param {string} url 
 */
export function testSameOrigin(url) {
    var loc = window.location,
        a = document.createElement('a');
    a.href = url;
    return a.hostname == loc.hostname &&
        a.port == loc.port &&
        a.protocol == loc.protocol;
}