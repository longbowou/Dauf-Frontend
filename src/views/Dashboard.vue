<template>
  <!--begin::Dashboard-->
  <div class="row">
    <div class="col-sm-4">
      <select v-model="searchBibleSelected" id="bible-select" class="form-select mb-3 form-select-lg"
              aria-label="Select example"
              data-control="select2">
        <option v-for="bible in bibles" :key="bible.id" :value="bible"
                :selected="searchBibleSelected?.id === bible.id">
          {{ bible.name }}
        </option>
      </select>

      <!--begin::Main wrapper-->
      <div class=""
           id="kt_docs_search_handler_basic"
           data-kt-search-keypress="true"
           data-kt-search-min-length="1"
           data-kt-search-enter="true"
           data-kt-search-layout="inline">

        <!--begin::Input Form-->
        <form data-kt-search-element="form" class="w-100 position-relative mb-5" autocomplete="off">
          <!--begin::Hidden input(Added to disable form autocomplete)-->
          <input type="hidden"/>
          <!--end::Hidden input-->

          <!--begin::Icon-->
          <span
              class="svg-icon svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 ms-5 translate-middle-y">
            <inline-svg src="media/icons/duotune/general/gen004.svg"/>
        </span>
          <!--end::Icon-->

          <!--begin::Input-->
          <input id="input-search" v-model="search" type="text" @keyup="onInputSearchKeyup"
                 class="form-control form-control-lg general/gen004.svg px-15"
                 name="search"
                 autofocus
                 placeholder="Genèse 1 1"
                 data-kt-search-element="input"/>
          <!--end::Input-->

          <!--begin::Spinner-->
          <span class="position-absolute top-50 end-0 translate-middle-y lh-0 d-none me-5"
                data-kt-search-element="spinner">
            <span class="spinner-border h-15px w-15px align-middle text-gray-400"></span>
        </span>
          <!--end::Spinner-->

          <!--begin::Reset-->
          <span
              class="btn btn-flush btn-active-color-primary position-absolute top-50 end-0 translate-middle-y lh-0 me-5 d-none"
              data-kt-search-element="clear">
          <span class="svg-icon svg-icon-2 svg-icon-lg-1 me-0">
              <inline-svg src="media/icons/duotune/arrows/arr061.svg"/>
          </span>
        </span>
          <!--end::Reset-->
        </form>
        <!--end::Form-->

        <!--begin::Wrapper-->
        <div class="">
          <!--being::Search suggestion-->
          <div data-kt-search-element="suggestions">

          </div>
          <!--end::Suggestion wrapper-->

          <!--begin::Search results-->
          <div data-kt-search-element="results" class="d-none">
            <div class="mh-300px scroll-y me-n5 pe-5">
              <div :onclick="() => filterOnBookSelected(book)" v-for="book in filterBooks" :key="book?.id"
                   class="d-flex align-items-center p-3 rounded-3 border-hover border border-dashed border-gray-300 cursor-pointer mb-1"
                   data-kt-search-element="customer">
                <!--begin::Info-->
                <div class="fw-semibold">
                <span class="fs-6 text-gray-800" v-html="book?.name">
                </span>
                </div>
                <!--end::Info-->
              </div>

              <div v-for="verse in filterBookVerses"
                   :key="verse?.id"
                   class="d-flex flex-column align-items-start p-3 rounded-3 border-hover border border-dashed border-gray-300 cursor-pointer mb-1"
                   data-kt-search-element="customer">
                <!--begin::Info-->
                <div class="fw-semibold" :onclick="(event) => filterOnBookVerseSelected(event, verse)">
                  <span class="fs-3">
                    {{ verse?.name }} • {{ verse?.bible?.abbreviatedTitle }}
                  </span>

                  <br>

                  <span class="fs-6 text-gray-800" style="text-align: justify">
                    {{ verse?.content }}
                  </span>
                </div>

                <div>
                  <button v-if="!isVerseSaved(verse)" @click="saveVerse(verse)"
                          class="btn btn-text-gray-500 btn-active-color-primary p-0">
                    Save
                  </button>
                  <span v-if="isVerseSaved(verse)" class="text-primary">Saved</span>
                </div>
                <!--end::Info-->
              </div>
            </div>
          </div>
          <!--end::Search results-->

          <!--begin::Empty search-->
          <div data-kt-search-element="empty" class="text-center d-none">

          </div>
          <!--end::Empty search-->
        </div>
        <!--end::Wrapper-->
      </div>
      <!--end::Main wrapper-->

      <div v-if="savedVerses?.length > 0">
        <div class="separator my-5"></div>

        <div class="row">
          <div class="col-sm-10">
            <!--begin::Main wrapper-->
            <div class=""
                 id="saved_verses_search"
                 data-kt-search-keypress="true"
                 data-kt-search-min-length="1"
                 data-kt-search-enter="true"
                 data-kt-search-layout="inline">

              <!--begin::Input Form-->
              <form data-kt-search-element="form" class="w-100 position-relative mb-5" autocomplete="off">
                <!--begin::Hidden input(Added to disable form autocomplete)-->
                <input type="hidden"/>
                <!--end::Hidden input-->

                <!--begin::Icon-->
                <span
                    class="svg-icon svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 ms-5 translate-middle-y">
            <inline-svg src="media/icons/duotune/general/gen004.svg"/>
        </span>
                <!--end::Icon-->

                <!--begin::Input-->
                <input id="saved-input-search" v-model="savedVersesSearch" type="text"
                       class="form-control form-control-lg general/gen004.svg px-15"
                       name="search"
                       autofocus
                       placeholder="Exode 1 1"
                       data-kt-search-element="input"/>
                <!--end::Input-->

                <!--begin::Spinner-->
                <span class="position-absolute top-50 end-0 translate-middle-y lh-0 d-none me-5"
                      data-kt-search-element="spinner">
            <span class="spinner-border h-15px w-15px align-middle text-gray-400"></span>
        </span>
                <!--end::Spinner-->

                <!--begin::Reset-->
                <span
                    class="btn btn-flush btn-active-color-primary position-absolute top-50 end-0 translate-middle-y lh-0 me-5 d-none"
                    data-kt-search-element="clear">
          <span class="svg-icon svg-icon-2 svg-icon-lg-1 me-0">
              <inline-svg src="media/icons/duotune/arrows/arr061.svg"/>
          </span>
        </span>
                <!--end::Reset-->
              </form>
              <!--end::Form-->

              <!--begin::Wrapper-->
              <div class="">
                <!--being::Search suggestion-->
                <div data-kt-search-element="suggestions">

                </div>
                <!--end::Suggestion wrapper-->

                <!--begin::Search results-->
                <div data-kt-search-element="results" class="d-none">
                  <div class="mh-300px scroll-y me-n5 pe-5">
                    <div :onclick="() => filterOnBookSelected(book)" v-for="book in filterBooks" :key="book?.id"
                         class="d-flex align-items-center p-3 rounded-3 border-hover border border-dashed border-gray-300 cursor-pointer mb-1"
                         data-kt-search-element="customer">
                      <!--begin::Info-->
                      <div class="fw-semibold">
                <span class="fs-6 text-gray-800" v-html="book?.name">
                </span>
                      </div>
                      <!--end::Info-->
                    </div>

                    <div v-for="verse in filterBookVerses"
                         :key="verse?.id"
                         class="d-flex flex-column align-items-start p-3 rounded-3 border-hover border border-dashed border-gray-300 cursor-pointer mb-1"
                         data-kt-search-element="customer">
                      <!--begin::Info-->
                      <div class="fw-semibold" :onclick="(event) => filterOnBookVerseSelected(event, verse)">
                  <span class="fs-3">
                    {{ verse?.name }} • {{ verse?.bible?.abbreviatedTitle }}
                  </span>

                        <br>

                        <span class="fs-6 text-gray-800" style="text-align: justify">
                    {{ verse?.content }}
                  </span>
                      </div>

                      <div>
                        <button v-if="!isVerseSaved(verse)" @click="saveVerse(verse)"
                                class="btn btn-text-gray-500 btn-active-color-primary p-0">
                          Save
                        </button>
                        <span v-if="isVerseSaved(verse)" class="text-primary">Saved</span>
                      </div>
                      <!--end::Info-->
                    </div>
                  </div>
                </div>
                <!--end::Search results-->

                <!--begin::Empty search-->
                <div data-kt-search-element="empty" class="text-center d-none">

                </div>
                <!--end::Empty search-->
              </div>
              <!--end::Wrapper-->
            </div>
            <!--end::Main wrapper-->
          </div>

          <div class="col-sm-1">
            <div class="form-check form-switch form-check-custom form-check-solid">
              <input v-model="showSavedVerseContent" class="form-check-input h-40px w-60px"
                     type="checkbox" value=""
                     id="flexSwitchChecked" checked="checked"/>
            </div>
          </div>
        </div>

        <div class="card pt-0" style="background-color: transparent">
          <div id="saved-card-body" class="card-body card-scroll p-5 pt-0">
            <div class="row">
              <div v-for="verse in savedVerses" :key="`saved-${verse?.id}`"
                   :class="['bg-light', 'm-1']">
                <a :id="`saved-verse-${verse?.id}`" class="btn ps-2 pt-2 pe-2 pb-0 col-sm-12"
                   v-on:click="savedVerseClick(verse)">
                  <div>
                    <h3>
                      <span v-if="isSavedVerseOnLive(verse)"
                            class="bullet bullet-dot bg-success h-15px w-15px me-5"></span>
                      {{ verse?.name }} • {{ verse?.bible?.abbreviatedTitle }}
                    </h3>
                    <span v-if="showSavedVerseContent" v-html="verse?.content"></span>
                  </div>
                </a>

                <br>

                <button @click="removeSavedVerse(verse)"
                        class="btn btn-text-gray-500 btn-active-color-danger p-0">
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-sm-8">
      <select v-model="liveBibleSelected" id="live-bible-select" class="form-select form-select-lg mb-2"
              aria-label="Select example"
              data-control="select2">
        <option v-for="bible in bibles" :key="bible.id" :value="bible"
                :selected="liveBibleSelected?.id === bible.id">
          {{ bible.name }}
        </option>
      </select>

      <div class="card" style="background-color: transparent">
        <div id="card-body" class="card-body card-scroll p-5 pt-0">
          <div class="row">
            <div :class="[(verse?.selected && verseSelectedIndex === index ? 'bg-success' : 'bg-light'), 'm-1']"
                 v-for="(verse, index) in verses" :key="verseKey(verse)">
              <a :id="`verse-${verseKey(verse)}`" class="btn col-sm-12 p-0"
                 v-on:click="verseClick(verse, index)">
                <div
                    class="pt-3 ps-3 pe-3"
                    :id="verse?.slug">
                  <h3>{{ verse?.name }} • {{ verse?.bible?.abbreviatedTitle }}</h3>
                  <span v-html="verse?.content"></span>
                </div>
                <span v-if="verse.linkedToNext" class="svg-icon svg-icon-2 svg-icon-dark me-0 me-md-2">
                  <inline-svg src="media/icons/duotune/arrows/arr082.svg"/>
                </span>
              </a>

              <div>
                <button v-if="!isVerseSaved(verse)" @click="saveVerse(verse)"
                        class="btn btn-text-gray-500 btn-active-color-primary p-0">
                  Save
                </button>
                <span v-if="isVerseSaved(verse)" class="text-primary">Saved</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--end::Dashboard-->
</template>

<script lang="js">
import {defineComponent} from "vue";
import {createClient} from "@urql/vue";
import {useScriptureStore} from "@/stores/useScriptureStore";
import {defaultSearchOptions, defaultSearchQueires, SearchComponent} from "@/assets/ts/components";
import slugify from "slugify"
import {useSavedScriptureStore} from "@/stores/useSavedScriptureStore";

const uqrlClient = createClient({
  url: process.env.VUE_APP_API_URL,
})

let verseSearchComponent = undefined;
let verseSearchWrapperElement = undefined;
let verseSearchSuggestionsElement = undefined;
let verseSearchResultsElement = undefined;
let verseSearchEmptyElement = undefined;
let verseSearchInput = undefined;

const wordsLimitCount = 30

export default defineComponent({
  name: "dashboard-main",
  setup() {
    const scriptureStore = useScriptureStore();
    const savedScriptureStore = useSavedScriptureStore();
    return {
      scriptureStore,
      savedScriptureStore,
    };
  },
  data() {
    return {
      verses: [],
      verseSelected: undefined,
      verseSelectedIndex: -1,
      fetchingVerses: false,
      bibles: [],
      liveBibleSelected: undefined,
      search: "",
      searchBibleSelected: undefined,
      books: [],
      bookNames: [],
      bookSelected: undefined,
      filterBooks: [],
      filterBookVerses: [],
      savedVerses: [],
      savedVersesSearch: "",
      showSavedVerseContent: false
    }
  },
  components: {},
  mounted() {
    window.addEventListener('keydown', (event) => this.keydown(event))
    window.addEventListener('keyup', (event) => this.keyup(event))

    verseSearchInput = window.document.querySelector('#input-search');
    verseSearchInput.addEventListener('keydown', (event) => {
      if (event.key === "Tab" && this.filterBooks.length > 0) {
        event.preventDefault()
        this.filterOnBookSelected(this.filterBooks[0])
      }
    })

    this.$nextTick(function () {
      window.document.querySelector('#card-body').style.maxHeight = `${window.innerHeight * 0.81}px`
      window.document.querySelector('#saved-card-body').style.maxHeight = `${window.innerHeight * 0.651}px`
    })

    uqrlClient
        .query(`
          {
            books(bibleSlug: "lsg"){
              id
              name
              slug
            }
          }`, {})
        .toPromise()
        .then(result => {
          if (result.data.books) {
            this.books = result.data.books
            this.bookNames = this.books.map((book) => book.name)
          }
        })

    uqrlClient
        .query(`
          {
            bibles {
              id
              name
              slug
            }
          }`, {})
        .toPromise()
        .then(result => {
          if (result.data.bibles) {
            this.bibles = result.data.bibles
            for (const bible of this.bibles) {
              if (bible.slug === "lsg") {
                this.searchBibleSelected = bible
                break
              }
            }

            this.fetchVerses()
          }
        })

    this.initVerseSearch();
    this.initSavedVerseSearch();

    this.savedVerses = this.savedScriptureStore.getSavedVerses
  },
  methods: {
    fetchVerses(next = false, previous = false) {
      this.fetchingVerses = true
      const query = `
          query($bibleSlug: String, $chapterSlug: String, $beforeChapterSlug: String, $afterChapterSlug: String){
            verses(bibleSlug: $bibleSlug, chapterSlug: $chapterSlug, beforeChapterSlug: $beforeChapterSlug, afterChapterSlug: $afterChapterSlug) {
              id
              name
              content
              bible {
                id
                abbreviatedTitle
              }
              bibleSlug
              chapterSlug
              slug
            }
          }
        `
      const variables = {bibleSlug: this.searchBibleSelected.slug}
      if (next && this.verses.length > 0) {
        variables['afterChapterSlug'] = this.verses[(this.verses.length - 1)].chapterSlug
      }

      if (previous && this.verses.length > 0) {
        variables['beforeChapterSlug'] = this.verses[0].chapterSlug
      }

      if (!next && !previous) {
        variables["chapterSlug"] = "genesis-1"
      }
      uqrlClient
          .query(query, variables)
          .toPromise()
          .then(result => {
            if (result.data && result.data.verses && result.data.verses.length > 0) {
              if (previous) {
                let verses = JSON.parse(JSON.stringify(this.verses))
                verses.unshift(...result.data.verses)
                verses = this.prettifyVerses(verses)

                let index = this.verseSelectedIndex;
                for (let i = 0; i < verses.length; i++) {
                  if (verses[i].id === this.verseSelected.id) {
                    verses[i].selected = true;
                    index = i;
                    break;
                  }
                }

                this.verses = verses;
                this.verseSelectedIndex = index;
                this.scrollToVerse()
              } else {
                this.verses.push(...result.data.verses);
              }
            }
          }).finally(() => {
        this.fetchingVerses = false
      })
    },
    keyup(event) {
      if (["ArrowUp", "ArrowDown"].includes(event.key)) {
        event.preventDefault();
      }
    },
    keydown(event) {
      if (["ArrowUp", "ArrowDown"].includes(event.key)) {
        event.preventDefault();

        if (event.key === "ArrowUp" && (this.verseSelectedIndex - 1) >= 0) {
          let index = this.verseSelectedIndex - 1
          const verse = this.verses[index]
          verse.selected = true
          this.verseSelected = verse
          this.verseSelectedIndex = index
          this.scriptureStore.setVerse(verse)
          this.scrollToVerse()
        }

        if (event.key === "ArrowDown" && (this.verseSelectedIndex + 1) < this.verses.length) {
          let index = this.verseSelectedIndex + 1
          const verse = this.verses[index]
          verse.selected = true
          this.verseSelected = verse
          this.verseSelectedIndex = index
          this.scriptureStore.setVerse(verse)
          this.scrollToVerse()
        }
      }
    },
    verseKey(verse) {
      if (verse.isPartial) {
        return `${verse.index}-${verse.id}`
      }
      return verse.id
    },
    verseClick(verse, index) {
      verse.selected = true
      this.verseSelected = verse
      this.verseSelectedIndex = index
      this.scriptureStore.setVerse(verse)
      this.scrollToVerse()
    },
    scrollToVerse() {
      this.$nextTick(function () {
        const scroll = window.document.querySelector(`#verse-${this.verseKey(this.verseSelected)}`)
        scroll?.scrollIntoView({
          block: "center",
          inline: "center",
          behavior: "auto"
        });
      })
    },
    initVerseSearch() {
      verseSearchWrapperElement = window.document.querySelector('[data-kt-search-element="wrapper"]');
      verseSearchSuggestionsElement = window.document.querySelector('[data-kt-search-element="suggestions"]');
      verseSearchResultsElement = window.document.querySelector('[data-kt-search-element="results"]');
      verseSearchEmptyElement = window.document.querySelector('[data-kt-search-element="empty"]');

      verseSearchComponent = new SearchComponent(
          window.document.querySelector("#kt_docs_search_handler_basic"),
          defaultSearchOptions,
          defaultSearchQueires
      )
      verseSearchComponent.on('kt.search.clear', () => {
        // Show recently viewed
        verseSearchSuggestionsElement.classList.remove("d-none");
        // Hide results
        verseSearchResultsElement.classList.add("d-none");
        // Hide empty message
        verseSearchEmptyElement.classList.add("d-none");
      })

      verseSearchComponent.on('kt.search.process', async () => {
        const searchSpitted = this.search.split(" ")
        this.filterBooks = []
        if (searchSpitted.length <= 1) {
          this.filterBooks = this.books
              .filter((book) => {
                return slugify(book.name.toLowerCase()).includes(this.search)
              });
        }

        if (this.bookNames.includes(this.search.trim())) {
          const result = await uqrlClient
              .query(`
                {
                  verses(bookSlug: "${this.bookSelected.slug}", bibleSlug: "${this.searchBibleSelected.slug}", limit: 5){
                    id
                    name
                    content
                    bible {
                      id
                      abbreviatedTitle
                    }
                    bibleSlug
                    chapterSlug
                    slug
                  }
                }`, {})
              .toPromise()
          if (result.data && result.data.verses && result.data.verses.length > 0) {
            this.filterBookVerses = result.data.verses
          }
        }

        if (searchSpitted.length > 2 &&
            Number(searchSpitted[(searchSpitted.length - 2)]) &&
            Number(searchSpitted[(searchSpitted.length - 1)])) {
          const result = await uqrlClient
              .query(`
                {
                  verses(
                    chapterSlug: "${this.bookSelected.slug}-${searchSpitted[(searchSpitted.length - 2)]}",
                    number: ${searchSpitted[(searchSpitted.length - 1)]},
                    bibleSlug: "${this.searchBibleSelected.slug}"){
                      id
                      name
                      content
                      bible {
                        id
                        abbreviatedTitle
                      }
                      bibleSlug
                      chapterSlug
                      slug
                  }
                }`, {})
              .toPromise()
          if (result.data && result.data.verses && result.data.verses.length > 0) {
            this.filterBookVerses = result.data.verses
          }
        } else if (searchSpitted.length > 1 && Number(searchSpitted[(searchSpitted.length - 1)])) {
          const result = await uqrlClient
              .query(`
                {
                  verses(chapterSlug: "${this.bookSelected.slug}-${searchSpitted[(searchSpitted.length - 1)]}", bibleSlug: "${this.searchBibleSelected.slug}"){
                    id
                    name
                    content
                    bible {
                      id
                      abbreviatedTitle
                    }
                    bibleSlug
                    chapterSlug
                    slug
                  }
                }`, {})
              .toPromise()
          if (result.data && result.data.verses && result.data.verses.length > 0) {
            this.filterBookVerses = result.data.verses
          }
        }

        // Show results
        verseSearchResultsElement.classList.remove("d-none");
        // Hide empty message
        verseSearchEmptyElement.classList.add("d-none");

        // Hide recently viewed
        // suggestionsElement.classList.add("d-none");
        // Hide results
        // resultsElement.classList.add("d-none");
        // Show empty message
        // emptyElement.classList.remove("d-none");

        verseSearchComponent.complete();
      })
    },
    onInputSearchKeyup(event) {
      console.log(event.key)
    },
    filterOnBookSelected(book) {
      this.search = `${book.name} `
      this.bookSelected = book

      // Hide recently viewed
      verseSearchResultsElement.classList.add("d-none");
      verseSearchInput.focus()
      verseSearchComponent.search()
    },
    filterOnBookVerseSelected(event, verse) {
      event.preventDefault()

      uqrlClient
          .query(`
            {
              verses(chapterSlug: "${verse.chapterSlug}", bibleSlug: "${this.searchBibleSelected.slug}"){
                id
                name
                content
                bible {
                  id
                  abbreviatedTitle
                }
                bibleSlug
                chapterSlug
                slug
              }
            }`, {})
          .toPromise()
          .then((result) => {
            if (result.data && result.data.verses && result.data.verses.length > 0) {
              const verses = this.prettifyVerses(result.data.verses)

              let index = 0;
              for (let i = 0; i < verses.length; i++) {
                if (verses[i].id === verse.id) {
                  verses[i].selected = true;
                  index = i;
                  break;
                }
              }

              this.verses = verses;
              this.verseSelected = verses[index];
              this.verseSelectedIndex = index;
              this.scriptureStore.setVerse(this.verseSelected)
              this.scrollToVerse()
            }
          })
      // Hide recently viewed
      verseSearchResultsElement.classList.add("d-none");
      verseSearchInput.focus()
    },
    isVerseSaved(verse) {
      for (const savedVerse of this.savedVerses) {
        if (verse.id === savedVerse.id) {
          return true
        }
      }
      return false
    },
    isSavedVerseOnLive(verse) {
      return verse.chapterSlug === this.verseSelected?.chapterSlug
    },
    saveVerse(verse) {
      this.savedVerses.push(verse)
      this.savedScriptureStore.setSavedVerses(this.savedVerses)
    },
    removeSavedVerse(verse) {
      for (let i = 0; i < this.savedVerses.length; i++) {
        if (this.savedVerses[i].id === verse.id) {
          this.savedVerses.splice(i, 1)
          break;
        }
      }
      this.savedScriptureStore.setSavedVerses(this.savedVerses)
    },
    savedVerseClick(verse) {
      uqrlClient
          .query(`
            {
              verses(chapterSlug: "${verse.chapterSlug}", bibleSlug: "${this.searchBibleSelected.slug}"){
                id
                name
                content
                bible {
                  id
                  abbreviatedTitle
                }
                bibleSlug
                chapterSlug
                slug
              }
            }`, {})
          .toPromise()
          .then((result) => {
            if (result.data && result.data.verses && result.data.verses.length > 0) {
              const verses = this.prettifyVerses(result.data.verses)

              let index = 0;
              for (let i = 0; i < verses.length; i++) {
                if (verses[i].id === verse.id) {
                  verses[i].selected = true;
                  index = i;
                  break;
                }
              }

              this.verses = verses;
              this.verseSelected = verses[index];
              this.verseSelectedIndex = index;
              this.scriptureStore.setVerse(this.verseSelected)
              this.scrollToVerse()
            }
          })
    },
    prettifyVerses(verses) {
      const results = []
      for (const verse of verses) {
        const contentSplit = verse.content.split(" ")
        if (contentSplit.length > wordsLimitCount) {
          const contents = [];
          for (let i = 0; i < contentSplit.length; i += wordsLimitCount) {
            const slice = contentSplit.slice(i, i + wordsLimitCount);

            if (i + wordsLimitCount >= contentSplit.length && slice.length <= 10) {
              contents[contents.length - 1] += ` ${slice.join(" ")}`
            } else {
              contents.push(slice.join(" "))
            }
          }
          for (let i = 0; i < contents.length; i++) {
            const splitVerse = JSON.parse(JSON.stringify(verse))
            splitVerse.index = i
            splitVerse.content = contents[i]
            splitVerse.isPartial = true
            if (i < (contents.length - 1)) {
              splitVerse.linkedToNext = true
            }
            results.push(splitVerse)
          }
        } else {
          results.push(verse)
        }
      }
      return results
    }
  },
  watch: {
    verseSelected(newVerse, oldVerse) {
      for (const bible of this.bibles) {
        if (newVerse.bibleSlug === bible.slug) {
          this.liveBibleSelected = bible
        }
      }
    },
    liveBibleSelected(newBible, oldBible) {
      if (this.verseSelected) {
        uqrlClient
            .query(`
            {
              verses(chapterSlug: "${this.verseSelected.chapterSlug}", bibleSlug: "${newBible.slug}"){
                id
                name
                content
                bible {
                  id
                  abbreviatedTitle
                }
                bibleSlug
                chapterSlug
                slug
              }
            }`, {})
            .toPromise()
            .then((result) => {
              if (result.data && result.data.verses && result.data.verses.length > 0) {
                const verses = this.prettifyVerses(result.data.verses)

                let index = 0;
                for (let i = 0; i < verses.length; i++) {
                  if (verses[i].slug === this.verseSelected.slug) {
                    verses[i].selected = true;
                    index = i;
                    break;
                  }
                }

                this.verses = verses;
                this.verseSelected = verses[index];
                this.verseSelectedIndex = index;
                this.scriptureStore.setVerse(this.verseSelected)
                this.scrollToVerse()
              }
            })
      }
    },
    verseSelectedIndex(newVerseIndexSelected, oldVerseIndexSelected) {
      if (oldVerseIndexSelected > newVerseIndexSelected &&
          newVerseIndexSelected - 10 <= 0 &&
          !this.fetchingVerses) {
        this.fetchVerses(false, true)
      }

      if (oldVerseIndexSelected < newVerseIndexSelected &&
          newVerseIndexSelected + 10 >= this.verses.length &&
          !this.fetchingVerses) {
        this.fetchVerses(true)
      }
    }
  }
});
</script>
