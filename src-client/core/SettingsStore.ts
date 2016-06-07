/** This class is a static store to access settings values at every time */
export class SettingsStore {
    private static height: number = 200;
    private static nickname: string = 'guest' + Math.floor((Math.random() * 1000) + 1);
    private static width: number = 400;

    public static getNickname(): string {
        return this.nickname;
    }
    public static setNickname(nickname: string): void {
        this.nickname = nickname;
    }
    public static getHeight(): number {
        return this.height;
    }
    public static setHeight(height: number): void {
        this.height = height;
    }
    public static getWidth(): number {
        return this.width;
    }
    public static setWidth(width: number): void {
        this.width = width;
    }
};
