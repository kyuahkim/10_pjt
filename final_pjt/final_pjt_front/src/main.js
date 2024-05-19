import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faSearch,
  faStar as fasStar,
  faCommentDots,
  faHome,
  faPhone,
  faUser,
  faChevronRight,
  faBuilding,
  faMapMarkedAlt,
  faMapMarker,
  faEnvelope,
  faSpinner,
  faUnlock,
  faUserShield,
  faSignOutAlt,
  faUserCircle,
  faUserEdit,
  faEraser,
  faAngleLeft,
  faPaperclip,
  faKey,
  faImage,
  faUpload,
  faSchool,
  faInfoCircle,
  faSignInAlt,
  faUserPlus,

} from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


// library.add(faUserSecret);
library.add(
  faSearch,
  fasStar,
  farStar,
  faCommentDots,
  faHome,
  faPhone,
  faUser,
  faChevronRight,
  faBuilding,
  faMapMarkedAlt,
  faMapMarker,
  faEnvelope,
  faSpinner,
  faUnlock,
  faUserShield,
  faSignOutAlt,
  faUserCircle,
  faUserEdit,
  faEraser,
  faAngleLeft,
  faPaperclip,
  faKey,
  faImage,
  faUpload,
  faSchool,
  faInfoCircle,
  faSignInAlt,
  faUserPlus,
)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)

const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

app.mount('#app')
