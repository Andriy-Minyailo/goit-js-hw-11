export class LoadMoreButton {
    constructor({ isHiden, disabled, loading, buttonAdress }) {
        this.isHiden = isHiden;
        this.disabled = disabled;
        this.loading = loading;
        this.buttonAdress = buttonAdress;
    }
    buttonState({ isHiden = this.isHiden, disabled = this.disabled, loading = this.loading }) {
        if (isHiden) {
            this.buttonAdress.classList.add('is-hidden');
        } else {
            this.buttonAdress.classList.remove('is-hidden');
        }
        if (disabled) {
            this.buttonAdress.disabled = true;
        } else {
            this.buttonAdress.disabled = false;
        }
        if (loading) {
            this.buttonAdress.textContent = 'Loading...';
        } else {
            this.buttonAdress.textContent = 'Load-more';
        }
    }
}