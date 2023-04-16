export class LoadMoreButton {
    constructor({ isHiden, disabled, loading, buttonAdress }) {
        this.isHiden = isHiden;
        this.disabled = disabled;
        this.loading = loading;
        this.buttonAdress = buttonAdress;
    }
    buttonState({ isHiden = this.isHiden, disabled = this.disabled, loading = this.loading }) {
        isHiden ? this.buttonAdress.classList.add('visually-hidden') : this.buttonAdress.classList.remove('visually-hidden');
        disabled ? this.buttonAdress.disabled = true : this.buttonAdress.disabled = false;
        loading ? this.buttonAdress.textContent = 'Loading...' : this.buttonAdress.textContent = 'Load-more';
    }
}