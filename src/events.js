function fireNavigate(location) {
    window.document.dispatchEvent(new CustomEvent('ternobo:navigate', { detail: { location: location } }));
}
function firePageLoad(location) {
    window.document.dispatchEvent(new CustomEvent('ternobo:loaded', { detail: { location: location } }));
}
function fireNavigationFinish(location) {
    window.document.dispatchEvent(new CustomEvent('ternobo:finish', { detail: { location: location } }));
}

function fireSharedataLoaded() {
    const onSharedDataLoad = new CustomEvent('ternobo:sharedataloaded', { detail: { user: response.data.user } });
    window.document.dispatchEvent(onSharedDataLoad);
}
function fireUserloaded(user) {
    const onUserLoad = new CustomEvent('ternobo:userloaded', { detail: { user: user } });
    window.document.dispatchEvent(onUserLoad);
}

export {
    fireNavigate,
    firePageLoad,
    fireNavigationFinish,
    fireSharedataLoaded,
    fireUserloaded
};