---
theme: none
colorSchema: 'light'
layout: intro
logoHeader: '/logo.svg'
website: 'dawntraoz.com'
handle: 'dawntraoz'
introImage: 'https://img2.storyblok.com/312x312/filters:format(webp)/f/79165/400x400/1082ff0d24/dawntraoz-alba-silvente.jpg'
---

# Unicorn slidev theme

Presentation slides for developers


<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 p-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Press Space for next page <carbon:arrow-right class="inline"/>
  </span>
</div>

---
logoHeader: '/logo.svg'
website: 'dawntraoz.com'
handle: 'dawntraoz'
layout: cover-logos
logos: [
  'https://img2.storyblok.com/256x0/filters:format(webp)/f/86387/x/4cf6a70a8c/logo-white-text.svg',
  '/nuxt-emoji-white.png',
  '/storyblok.png'
]
---

Frontend Developer Consultant at **@passionpeopleNL**
Blogger, speaker and open source lover

Ambassador at **@nuxt_js** and **@storyblok**

---
logoHeader: '/logo.svg'
website: 'dawntraoz.com'
handle: 'dawntraoz'
layout: table-contents
gradientColors: ['#A21CAF', '#5B21B6']
---

# What is Slidev?

Slidev is a slides maker and presenter designed for developers, consist of the following features
  
- 📝 **Text-based** - focus on the content with Markdown
- 🎨 **Themable** - create your theme
- 🧑‍💻 **Developer Friendly** - code highlighting, live coding
- 🤹 **Interactive** - embedding Vue components
- 🎥 **Recording** - built-in recording and camera view
- 📤 **Portable** - export into PDF, PNGs, or even a host it
- 🛠 **Hackable** - anything possible on a webpage

---
logoHeader: '/logo.svg'
website: 'dawntraoz.com'
handle: 'dawntraoz'
layout: new-section
sectionImage: '/section-illustration.svg'
---

# This is a new section
Some content to explain

---
logoHeader: '/logo.svg'
website: 'dawntraoz.com'
handle: 'dawntraoz'
---

# Navigation

Hover on the bottom-left corner to see the navigation's controls panel

### Keyboard Shortcuts

|     |     |
| --- | --- |
| <kbd>space</kbd> / <kbd>tab</kbd> / <kbd>right</kbd> | next animation or slide |
| <kbd>left</kbd> | previous animation or slide |
| <kbd>up</kbd> | previous slide |
| <kbd>down</kbd> | next slide |

---
logoHeader: '/logo.svg'
website: 'dawntraoz.com'
handle: 'dawntraoz'
layout: image-center
image: 'https://source.unsplash.com/collection/94734566/1920x1080'
imageWidth: '450'
imageHeight: '950'
---

# Image centered

Making use of `image-center` layout.

---
logoHeader: '/logo.svg'
website: 'dawntraoz.com'
handle: 'dawntraoz'
layout: cover
---

# Code

Use code snippets and get the highlighting directly!

```ts
interface User {
  id: number
  firstName: string
  lastName: string
  role: string
}

function updateUser(id: number, update: Partial<User>) {
  const user = getUser(id)
  const newUser = {...user, ...update}  
  saveUser(id, newUser)
}
```

---
layout: center
---

# Thank you

[Documentations](https://sli.dev) / [GitHub Repo](https://github.com/slidevjs/slidev)
