<script setup lang="ts">
const search = ref('dune');

const isLoading = ref(false);
const searchResults = ref<OpenlibrarySearchResults['docs']>([]);

type OpenlibrarySearchResults = {
    numFound: number,
    start: number,
    numFoundExact: true,
    num_found: number,
    documentation_url: string,
    q: string,
    offset: number | null,
    docs: {
        author_name: string[],
        key: string,
        title: string,
        cover_i: number,
    }[],
}

async function onSubmit() {
    isLoading.value = true;
    const results = await $fetch<OpenlibrarySearchResults>(`https://openlibrary.org/search.json?q=${encodeURIComponent(search.value)}&fields=key,title,author_name,cover_i&limit=5`);
    // const results = {"numFound":47268,"start":0,"numFoundExact":true,"num_found":47268,"documentation_url":"https://openlibrary.org/dev/docs/api/search","q":"Dune","offset":null,"docs":[{"author_key":["OL79034A"],"author_name":["Frank Herbert"],"cover_edition_key":"OL32848840M","cover_i":11481354,"ebook_access":"borrowable","edition_count":121,"first_publish_year":1965,"has_fulltext":true,"ia":["dune00herb_5","illustrateddune00fran","dune000herb","dune00herb","duneherb00herb","duneherb00herb","duneherb00herb","dune0000herb_x0j6","dune00fran","dune0000herb_a7n1","dunefran00fran","dunetome100pock","dunedunechronicl00fran","isbn_0425080021","derwstenplanet00herb"],"ia_collection_s":"California-State-Suggested-Reading;additional_collections;americana;americanuniversity-ol;belmont-ol;binghamton-ol;books;cnusd-ol;cua-ol;delawarecountydistrictlibrary;delawarecountydistrictlibrary-ol;denverpubliclibrary-ol;drakeuniversity-ol;framingham-ol;goffstownlibrary-ol;hamiltonpubliclibrary-ol;inlibrary;internetarchivebooks;ithacacollege-ol;johnshopkins-ol;library_of_atlantis;miltonpubliclibrary-ol;occidentalcollegelibrary-ol;openlibrary-d-ol;printdisabled;randolph-macon-college-ol;riceuniversity-ol;rochester-ol;schroederlibrary-ol;the-claremont-colleges-ol;toronto;tulsacc-ol;ualberta_historical_school;ualbertawiedrick;udc-ol;unb-ol;uni-ol;university_of_alberta_libraries;universityofcoloradoboulder-ol;wilsoncollege-ol;wrlc-ol","key":"/works/OL893415W","language":["pol","spa","gre","por","rus","eng","ger","fre"],"lending_edition_s":"OL26242482M","lending_identifier_s":"dune00herb_5","public_scan_b":false,"title":"Dune"},{"author_key":["OL79034A"],"author_name":["Frank Herbert"],"cover_edition_key":"OL10256217M","cover_i":2421405,"ebook_access":"borrowable","edition_count":70,"first_publish_year":1969,"has_fulltext":true,"ia":["messiiadiunydeti00herb","dunesuividelemes0000herb","dunemessiahdunec00fran","bwb_S0-AUP-722","dunemessiah00fran","dunemessiah00herb","dunemessiah0000unse","isbn_0450012298","dunemessiah02herb","dunemessiahbookt00herb","dunemessiahbookt00herb"],"ia_collection_s":"americana;binghamton-ol;cnusd-ol;dartmouthlibrary-ol;delawarecountydistrictlibrary;delawarecountydistrictlibrary-ol;denverpubliclibrary-ol;gwulibraries-ol;inlibrary;internetarchivebooks;library_of_atlantis;openlibrary-d-ol;printdisabled;rochester-ol;spokanepubliclibrary-ol;uni-ol;universityofcoloradoboulder-ol;worthingtonlibraries-ol","key":"/works/OL893526W","language":["tur","por","fre","eng","pol","und","spa","dut","ger","rus"],"lending_edition_s":"OL23044495M","lending_identifier_s":"messiiadiunydeti00herb","public_scan_b":false,"title":"Dune Messiah"},{"author_key":["OL27695A"],"author_name":["Agatha Christie"],"cover_edition_key":"OL40281064M","cover_i":12996556,"ebook_access":"borrowable","edition_count":111,"first_publish_year":1932,"has_fulltext":true,"ia":["perilatendhouse00agat","lamaisonduperil0000chri_y1e6","lamaisonduperil0000chri","dashausderdune0000chri","dashausderdunero0000chri","moordondervuurwe0000chri","agathachristiepe0000agat","agathachristie0000unse_a6f5","perilatendhouse0000chri_x7r2","perilatendhouse00chri","perilatendhouse00chri_0","lamaisonduperil0000agat","peligroinminente0000agat","perilatendhouse0000chri","perilatendhouse0000chri_n8v7","isbn_006138934","lccn_0553340730","perilendhouse0000agat","isbn_9780007659562","perilatendhouse0000agat"],"ia_collection_s":"americana;cnusd-ol;delawarecountydistrictlibrary;inlibrary;internetarchivebooks;library_of_atlantis;occidentalcollegelibrary-ol;openlibrary-d-ol;printdisabled","key":"/works/OL472165W","language":["ita","vie","eng","spa","fre","ger","dut"],"lending_edition_s":"OL26379432M","lending_identifier_s":"perilatendhouse00agat","public_scan_b":false,"title":"Peril at End House"},{"author_key":["OL27363A","OL14526040A","OL6897661A"],"author_name":["Gabriel García Márquez","Francis Salvery","Arthur Daniel"],"cover_edition_key":"OL24945433M","cover_i":8489859,"ebook_access":"borrowable","edition_count":98,"first_publish_year":1980,"has_fulltext":true,"ia":["munkurappattacav0000garc","cronacadiunamort0000garc","kroniekvaneenaan0000gabr","chronikeinesange0000gabr","chronikeinesange0000garc","chronikeinesange0000garc_z6y8","kronikaohlasenes0000garc","chroniquedunemor0000garc","chroniquedunemor0000garc_a9j3","chroniquedunemor0000gabr","cronicadeunamuer00gabr_1","chronicleofdeath0000garc_z3h7","chronikeinesange0000unse_b0e3","cronicadeunamue00garc","cronicadeunamuer00gabr","chronicleofdeath00garc_0","cronicadeunamuer00gabr_0","istoriiaodnoisme00garc","chronicleofdeath0000garc_l6d8","chronicleofdeath00garc"],"ia_collection_s":"americana;inlibrary;internetarchivebooks;printdisabled","key":"/works/OL274574W","language":["jpn","ara","tam","por","fre","eng","cze","alb","rus","spa","ger","gre","ita"],"lending_edition_s":"OL38562453M","lending_identifier_s":"munkurappattacav0000garc","public_scan_b":false,"title":"Crónica de una muerte anunciada"},{"author_key":["OL113362A"],"author_name":["Charlotte Brontë"],"cover_edition_key":"OL6969829M","cover_i":8235363,"ebook_access":"public","edition_count":1170,"first_publish_year":1847,"has_fulltext":true,"ia":["janeeyre0000bron_s6p5","janeeyreautobiog11bron","janeeyreautobiog00bron_0","lifeworksofsiste01bron","janeeyreautobiog00bron","janeeyre02bron","bub_gb_UBbowmwj1tEC","janeeyreautobiog01bron","janeeyrewithintr01bronuoft","janeeyreautobiog00bronrich","janeeyreautobiog00bronuoft","miscellanyofscot0015scot","janeeyreoummoir00brongoog","janeeyreanautob00brongoog","janeeyreanautob05brongoog","janeeyreanautob03brongoog","janeeyre00dulagoog","janeeyre06brongoog","janeeyre05brongoog","janeeyre0000bron_u6p6","janeeyre0000bron_b9e5","janeeyre0000bron_m2o2","jianai0000bron_q0o4","jianai0020bron","dziwnelosyjaneey0000bron","jianaizhongyingd0000bron","jenea0000bron","dzheineir0000bron","jianai0000bron_l3r1","jianai0012bron","janeeyre0000bron_d4u7","jianai0000bron","jianai0000bron_y5k9","janeeyre0000bron_k7w7","jianaijaneeyre0000bron","janeeyre0000bron_g0l2","janeeyre0000bron_g8z8","janeeyre0000bron_r9z9","janeeyreannotate0000char","janeeyre0000bron_n6x1","janeeyre0000bron_n9y5","janeeyreroman0000bron","janeeyre0000bron_d5s6","janeeyre0000bron_r2v7","janeeyre0000bron_c7h1","janeeyre0000bron_f6w5","isbn_9780312142025","janeeyre0000bron_v6r7","janeeyrespec0000char","illustratedjanee0000bron","janeeyrepocketcl00acad","janeeyre0000bron_e9h4","isbn_9781587264108","isbn_0883012669","janeeyre0000bron_c6z0","janeeyre0000bron_d4z0","isbn_9781457619335","janeeyre0000bron_q0c3","janeeyre0000bron","janeeyreautobiog0008bron","janeeyre0000bron_x1g1","janeeyreauthorit0000bron_u3d9","janeeyre0000bron_b4a8","janeeyreauthorit0000bron","janeeyrecomplete0000bron","janeeyreauthorit00bron","janeeyre0000bron_b0l4","janeeyre0001bron","janeeyre0000bron_n7s8","janeeyre0000bron_i9r9","janeeyrepenguinp00char","janeeyre0000bron_p2r9","janeeyre0000page","janeeyrepenguinc00char","janeeyre0000bron_o9f4","janeeyreauthorit2001bron","janeeyre0000bron_e6b3","janeeyre0000bron_n0x9","janeeyre000bron","janeeyre0000bron_g3f0","janeeyre0000west","janeeyrefromstor0000clay","janeeyre0000bron_e9j6","charlottebrontes0000holl","isbn_088103214x","janeeyre00char","janeeyre0000bron_x4g5","janeeyre0000fhto","isbn_9787560012476","janeeyreautobiog0000bron","janeeyre0000tavn_t6u4","janeeyre0000bron_w8l6","janeeyresignetcl00char","isbn_9780007350803","janeeyre0000bron_c9y6","janeeyrepacemake00char","janeeyre0000bron_v4c1","janeeyre0000unse_i1l0","janeeyrelongmanc00char","janeeyre0000unse","janeeyre00bron_1","isbn_9780199535590","janeeyre00bron","isbn_9780486453958","janeeyre0000bron_s3j9","janeeyre00bron_2","janeeyre0000bron_d1b8","janeeyre00bronrich","janeeyreedbyste000bron","janeeyre00bron_3","janeeyre0000bron_a1l2","janeeyrepuffincl00char","janeeyrewatermil00char","janeeyrebarnesno00char","janeeyre00bron_0","janeeyre2009bron","janeeyre0000bron_w0d8"],"ia_collection_s":"365-Books-by-Women-Authors;Brandeis_University;additional_collections;americana;americanuniversity-ol;barryuniversity-ol;belmont-ol;binghamton-ol;blc;bostonpubliclibrary;bpljordan-ol;brucepeel;cdl;cnusd-ol;cua-ol;dartmouthlibrary-ol;delawarecountydistrictlibrary-ol;duke_libraries;europeanlibraries;framingham-ol;gwulibraries-ol;hamiltonpubliclibrary-ol;inlibrary;internetarchivebooks;ithacacollege-ol;johnshopkins-ol;kellylibrary;marymount-ol;occidentalcollegelibrary-ol;openlibrary-d-ol;popularchinesebooks;printdisabled;prscr;riceuniversity-ol;robarts;rochester-ol;schroederlibrary-ol;stmaryscountylibrary;the-claremont-colleges-ol;toronto;trent_university;tulsacc-ol;udc-ol;uhmauicollege-ol;unb-ol;unclibraries;uni-ol;university_of_alberta_libraries;university_of_toronto;universityofarizona-ol;universityofcoloradoboulder-ol;universityofoklahoma-ol;universityofthewest-ol;uslprototype;wilsoncollege-ol;worthingtonlibraries-ol;wrlc-ol","key":"/works/OL1095427W","language":["jpn","mul","por","fre","eng","pol","und","cze","spa","swe","chi","vie","ger","cor","rus","sot","ita"],"lending_edition_s":"OL35354586M","lending_identifier_s":"janeeyre0000bron_s6p5","public_scan_b":true,"title":"Jane Eyre","id_standard_ebooks":["charlotte-bronte/jane-eyre"]}]};

    searchResults.value = results.docs;
    isLoading.value = false;
}

onSubmit();
</script>

<template>
    <div class="w-full flex items-center justify-center">
        <div class="mx-auto max-w-md w-full p-4 ring-1 ring-highlight rounded-lg flex flex-col gap-4 transition-all duration-150">
            <form class="flex flex-row gap-2" @submit.prevent="onSubmit">
                <input
                    v-model="search"
                    type="text" 
                    placeholder="Search for a book..." 
                    class="p-2 w-full rounded-md outline-none" >
                <button type="submit" class="rounded-md hover:bg-base aspect-square flex items-center justify-center">
                    <Icon name="material-symbols:search-rounded" size="24" />
                </button>
            </form>
            <div v-if="isLoading" class="min-h-32 flex items-center justify-center">
                <LoadingIcon />
            </div>
            <ul class="flex flex-col max-h-64 overflow-y-auto gap-2" v-else>
                <li 
                    v-for="item in searchResults">
                    <RouterLink :to="`${item.key}`" class="flex flex-row gap-4 p-1 rounded-md hover:bg-base cursor-pointer">
                        <div>
                            <img :src="`https://covers.openlibrary.org/b/id/${item.cover_i}-S.jpg`" :alt="`Cover for ` + item.title">
                        </div>
                        <div class="flex flex-col justify-around">
                            <span class="font-medium">{{ item.title }}</span>
                            <span class="text-sm text-text-secondary">{{ item.author_name[0] }}</span>
                        </div>
                    </RouterLink>
                </li>
            </ul>
        </div>
    </div>
</template>