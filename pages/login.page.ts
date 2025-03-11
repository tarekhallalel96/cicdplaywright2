import { Page } from "@playwright/test"
import { error } from "console";

class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;


    }

    elements = {
        username: () => this.page.locator('[data-test="username"]'),
        password: () => this.page.locator('[data-test="password"]'),
        submit: () => this.page.locator('#login-button'),
        errorMssage: ()=>this.page.locator('h3')

    }


    async saisirUsername(username: string) {
        await this.elements.username().fill(username);}
    async saisirPassword(password: string){
        await this.elements.password().fill(password);}
    async CliquesurLogin(){
        await this.elements.submit().click();

            }
    async getErrorMessage(){
     return this.elements.errorMssage()
        }
    }
export default LoginPage ;














