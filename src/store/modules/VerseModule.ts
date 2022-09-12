import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { Actions, Mutations } from "@/store/enums/StoreEnums";

interface Verse {
  name: string;
  number: string;
  content: string;
}

interface VerseInfo {
  current: Verse;
}

@Module
export default class VerseModule extends VuexModule implements VerseInfo {
  current = {
    name: "Genesis 1:1 (KJV)",
    number: "1",
    content: "In the beginning God created the heaven and the earth."
  };

  /**
   * Get current verse
   * @returns object
   */
  get currentVerse(): Verse {
    return this.current;
  }

  @Mutation
  [Mutations.SET_VERSE](payload) {
    this.current = payload;
  }

  @Action
  [Actions.SET_VERSE](payload) {
    this.context.commit(Mutations.SET_VERSE, payload);
  }
}
