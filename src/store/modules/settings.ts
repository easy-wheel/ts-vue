import {
  VuexModule,
  Mutation,
  Action,
  getModule,
  Module
} from "vuex-module-decorators";
import store from "@/store";
import elementVariables from "@/styles/element-variables.scss";
import defaultSettings from "@/settings";

export interface ISettingsState {
  theme: string;
  showSettings: boolean;
  sidebarTextTheme: boolean;
}

@Module({ dynamic: true, store, name: "settings" })
class Settings extends VuexModule implements ISettingsState {
  public theme = elementVariables.theme;
  public showSettings = defaultSettings.showSettings;
  public sidebarTextTheme = defaultSettings.sidebarTextTheme;

  @Mutation
  private CHANGE_SETTING(payload: { key: string; value: any }) {
    const { key, value } = payload;
    if (Object.prototype.hasOwnProperty.call(this, key)) {
      (this as any)[key] = value;
    }
  }

  @Action
  public ChangeSetting(payload: { key: string; value: any }) {
    this.CHANGE_SETTING(payload);
  }
}

export const SettingsModule = getModule(Settings);
