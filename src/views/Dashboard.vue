<template>
  <!--begin::Dashboard-->
  <div class="row">
    <div class="col-sm-4">
      <select v-model="searchBibleSelected" id="bible-select" class="form-select mb-3"
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
            <inline-svg src="media/icons/duotune/general/gen021.svg"/>
        </span>
          <!--end::Icon-->

          <!--begin::Input-->
          <input id="input-search" v-model="search" type="text"
                 class="form-control form-control-lg form-control-solid px-15"
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

              <div :onclick="() => filterOnBookVerseSelected(verse)" v-for="verse in filterBookVerses" :key="verse?.id"
                   class="d-flex align-items-center p-3 rounded-3 border-hover border border-dashed border-gray-300 cursor-pointer mb-1"
                   data-kt-search-element="customer">
                <!--begin::Info-->
                <div class="fw-semibold">
                <span class="fs-3">
                  {{ verse?.name }} • {{ verse?.bible?.abbreviatedTitle }}
                </span> <br>
                  <span class="fs-6 text-gray-800" style="text-align: justify">
                  {{ verse?.content }}
                </span>
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

    <div class="col-sm-8">
      <select v-model="liveBibleSelected" id="live-bible-select" class="form-select mb-2"
              aria-label="Select example"
              data-control="select2">
        <option v-for="bible in bibles" :key="bible.id" :value="bible"
                :selected="liveBibleSelected?.id === bible.id">
          {{ bible.name }}
        </option>
      </select>

      <div class="card" id="card" style="background-color: transparent">
        <div id="card-body" class="card-body card-scroll p-5">
          <div class="row">
            <a v-for="(verse, index) in verses" :key="verse?.id" :id="`verse-${verse?.id}`" class="btn p-1"
               v-on:click="verseClick(verse, index)">
              <div
                  :class="[(verse?.selected && verseSelectedIndex === index ? 'bg-primary' : 'bg-light'), 'rounded', 'p-5']"
                  :id="verse?.slug">
                <h3>{{ verse?.name }} • {{ verse?.bible?.abbreviatedTitle }}</h3>
                <span v-html="verse?.content"></span>
              </div>
            </a>
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

const uqrlClient = createClient({
  url: process.env.VUE_APP_API_URL,
})

let wrapperElement = undefined;
let suggestionsElement = undefined;
let resultsElement = undefined;
let emptyElement = undefined;
let inputSearch = undefined;

export default defineComponent({
  name: "dashboard-main",
  setup() {
    const scriptureStore = useScriptureStore();
    return {
      scriptureStore,
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
    }
  },
  components: {},
  mounted() {
    window.addEventListener('keydown', (event) => this.keydown(event))
    window.addEventListener('keyup', (event) => this.keyup(event))

    // window.$('#bible-select').select2()
    // window.$('#live-bible-select').select2()
    window.$('#card-body').height(window.innerHeight * 0.75)

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

    this.initSearch();
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
          .query(query, variables, {requestPolicy: "network-only"})
          .toPromise()
          .then(result => {
            if (result.data && result.data.verses) {
              if (previous) {
                const verses = JSON.parse(JSON.stringify(this.verses))
                verses.unshift(...result.data.verses)

                let index = this.verseSelectedIndex;
                for (let i = 0; i < verses.length; i++) {
                  if (verses[i].id === this.verseSelected.id) {
                    console.log(verses[0])
                    console.log(i)
                    verses[i].selected = true;
                    index = i;
                    break;
                  }
                }

                this.verses = verses;
                this.verseSelectedIndex = index;
                this.$nextTick(function () {
                  this.scrollToVerse()
                });
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
    verseClick(verse, index) {
      verse.selected = true
      this.verseSelected = verse
      this.verseSelectedIndex = index
      this.scriptureStore.setVerse(verse)
      this.scrollToVerse()
    },
    scrollToVerse() {
      const scroll = window.document.querySelector(`#verse-${this.verseSelected.id}`)
      scroll?.scrollIntoView({
        block: "center",
        inline: "center",
        behavior: "auto"
      });
    },
    initSearch() {
      wrapperElement = window.document.querySelector('[data-kt-search-element="wrapper"]');
      suggestionsElement = window.document.querySelector('[data-kt-search-element="suggestions"]');
      resultsElement = window.document.querySelector('[data-kt-search-element="results"]');
      emptyElement = window.document.querySelector('[data-kt-search-element="empty"]');
      inputSearch = window.document.querySelector('#input-search');

      const search = new SearchComponent(
          window.document.querySelector("#kt_docs_search_handler_basic"),
          defaultSearchOptions,
          defaultSearchQueires
      )
      search.on('kt.search.clear', () => {
        // Show recently viewed
        suggestionsElement.classList.remove("d-none");
        // Hide results
        resultsElement.classList.add("d-none");
        // Hide empty message
        emptyElement.classList.add("d-none");
      })

      search.on('kt.search.process', async () => {
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
          if (result.data && result.data.verses) {
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
          if (result.data && result.data.verses) {
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
          if (result.data && result.data.verses) {
            this.filterBookVerses = result.data.verses
          }
        }

        // Show results
        resultsElement.classList.remove("d-none");
        // Hide empty message
        emptyElement.classList.add("d-none");

        // Hide recently viewed
        // suggestionsElement.classList.add("d-none");
        // Hide results
        // resultsElement.classList.add("d-none");
        // Show empty message
        // emptyElement.classList.remove("d-none");

        search.complete();
      })
    },
    filterOnBookSelected(book) {
      this.search = book.name
      this.bookSelected = book

      // Hide recently viewed
      resultsElement.classList.add("d-none");
      inputSearch.focus()
    },
    filterOnBookVerseSelected(verse) {
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
            if (result.data && result.data.verses) {
              const verses = result.data.verses

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
              this.$nextTick(function () {
                this.scrollToVerse()
              });
            }
          })
      // Hide recently viewed
      resultsElement.classList.add("d-none");
      inputSearch.focus()
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
              if (result.data && result.data.verses) {
                const verses = result.data.verses

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
                this.$nextTick(function () {
                  this.scrollToVerse()
                });
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
