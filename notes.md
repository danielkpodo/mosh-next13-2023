# What this course covers (Part 1)

- Next.js Fundamentals
- Styling
- Routing and Navigation
- Building APIs
- Database Integration with Prisma
- Uploading files
- Authentication and Authourization
- Sending Emails
- Optimizations
- Deployment

## What is Next.js

- Is a react framework for building fast and search-engine friendly applications
- It is built on top of react
- React is a library for building interactive UIs
- A framework is a collection of tools, libraries and conventions
- It comes with a compiler for transforming and minifying our javascript code
- Next.js comes with a node.js runtime => a node.js runtime is just a programme that can execute js code on the server
- Next.js allows to do fullstack development => we can do both the frontend and backend code within the same project
- The backend code get executed within the node.js runtime
- The node.js runtime enables us to render our components on the server and send the contents to the client: this is called server-side rendering (This makes our application faster and SEO friendly)
- With next.js we can pre-render some pages that have static data (we just render them once and serve them whenever they are needed) (this is called static site generation) this makes our pages extremely fast

## Setting up development env

- Install node.js v16 or later
- Install javascript and typescript nightly by microsoft ext for vscode
- Install tailwind intellisense

## Creating our first next.js project

```bash
npx create-next-app@latest
npx create-next-app@13.4 # this is use in the course

```

- Answer the prompts and install all dependencies

## Project Structure

- The `app folder ` is the container for our routing system
  - In next.js our router is based on the file system
  - We can simply create files and folders to represent our routes
  - The `layout.tsx` represents the common layout for our pages
  - The `page.tsx` represents our homepage
- The `public folder` this is where we can put our assets e.g images, fonts etc

## Routing and Navigation

- Routing in next.js is based on the file system
- To create a route in the `app folder` let's say /users we create a folder named `user` and inside it we create the file `page.tsx`
- Make sure the file is named `page.tsx` this is one of the convention next.js looks for (So the routing system in next.js is based on convention not configuration)
- The extension of the page file can be one of `[.js, ts, tsx, jsx]`
- Inside the page.tsx we should export a react component when the user is at this location
- Any other file in the `users folder ` will not be accessible: this is how the new app router is different from the old pages router. In the old pages router other files can be accessed
- Inside the `users folder` we can also create what we called nested routes with the folder name `new`

  ### Handling Navigation

- Using the traditional anchor link that is `<a href="/users/">Go to usrs </a>` refetches the entire sites assets which is very bad for performance
- In next.js we improve this by using the `Link` component (The link component do not redownload the sites assets this is what we called client navigation)
- The Link component only fetches the content area which is the only necessary part we need for our page

## Client vrs Server Component

In nextjs we have two rendering environments where we can render our component and generate our html markups

- Client (web browser)
- Server (node.js runtime)

- Rendering components on the client is similar to how react applications work (We refer to this technique as client side rendering or CSR in short)
- On the other hand, SSR (Server-side Rendering) -> components are rendered on the server

  ### Differences B/n Client Side Rendering and SSR

  `CSR`

- with client side rendering we have to bundle all our components and send them to the client (web browser): this means as our application grows so does our bundle size grows. The larger the bundle the more resource we need on our ram to load the resource, thus, this approach is resource heavy.
- Another problem of CSR is that of SEO. search engines bot cannot view our page content because they cannot execute our javascript code so they cannot render our components like a web browser.
- Any sensitive data we have in our components like api keys would be exposed. (thus they are less secure)

`SSR`

- When we render our components on the server we can get rid of all the problems of CSR
- We only send the essential components to the client and prevent our bundle from becoming unnecessarily large (short form: smalller bundle size)
- Resource Efficient: Because our server handles most of the component rendering we use less resources on the client
- SEO: Because rendering is done on the server and we send the actual content to the client search engine bots can view and index our pages
- More Secure: We can keep sensitive data like api keys on the server

- However with SSR we `loose interactivity`, thus server components cannot listen to browser events like [click, change, submit etc], they cannot access browser apis, they cannot maintain state, and useEffects. This functionality are only available in client components
  NOTE://

```bash
In summary SERVER COMPONENTS CANNOT

- listen to browser events
- Access browser apis
- Maintain state
- Perform useEffects
```

- In real world scenarios, we often use a mixture of server and client components
- We should default to server components and only use client components when we absolutely need them

- Here is a real world example lets say we want to build a page to show a list of products. to build this page we will need several components like navbar, sidebar, productcard, pagination,footer. In standard react application we have to package all this components and send them to the client for rendering, but in next.js we can keep all this components on the server and minimize the bundle size. There is just one exception, to add a product to a shopping cart we need to handle a click event of the button. Typically we implement this functionality in the product card component so we have to make it a client component. That is one option. But there is a better way we can keep the product card on the server and do most of the rendering there and extract a small component that only contains the add button.(e.g AddToCart) with this method we only ships a tiny component to the client
  and keeps everything on the server.

- `Note. In Next.js all components inside the app folder are server components by default. So that means all the pages inside the /app folder this are all server components and are rendered on the server`
- `Also note that in previous versions of next.js the pages router does not support server components so you should stop using it and switch to the new app router`

- lets create a folder called `components` inside the `/app folder`. Remember this folder is not publicly accessible unless we add a `page.tsx file inside of it`. This means we can co-locate our project files like our components with other files and folders and is perfectly fine
- Inside the component folder lets add a new file called ProductCard.tsx. when we handle a button event in this file and add it to server component we will get a runtime error. This is because server componentst cannot handle interactivity. Now we have two options to fix this error.
- One option is to make the entire `ProductCard.tsx` component a client component. we achieve this by using the `use client` directive at the top of the file. With this we telling next.js to include this file in our js bundle. That means if this component is dependant on other component those components will automatically become client components and will be included in our js bundle. so we do not have to repeat this directive on every client component.

- There is a better way. to make our applications faster and more seo friendly, we want to render our components on the server and use client components only when absolutely necessary. So in our `ProductCard.tsx` it could have some complex markup. we want to render all that markup on the server and move the button to the client

## Fetching Data

- There are two ways we can fetch data

1. Client

- To fetch data on the client we typically use the useState and useEffect hook or using something like React Query
- React Query is a better alternative using the useState and useEffect hook
- Fetching data on the client have all the problems of CSR
- There is another problem with this approach there is an extra roundtrip to the server

* We can fetch data in our server components and get rid of all this problems with CSR

2. Server

- In server components we can use the fetch api
- We can make our component function just async and then fetch data normally and map the data using `.map` function
- The data is fetch on the server and we just need to map over it
- To fetch data whenever possible use server components

## Caching

- Fetching data in server components have extra benefits and that is caching
- The idea of caching is to store data somewhere that is faster to access
- Basically there are three places we can get the data from.

  1. memory
  2. file system
  3. network - very slower

- Next.js comes with a built in data cache
- Whenever we use the `fetch function` to fetch data next.js will automatically stoe the data in its file system, so that the next time we hit the same endpoint next.js is going to get the data from its file system
- We have full control over this caching behaviour, if we have data that changes frequently we can disable data caching, or treat data in cache as fresh for a certain period of time
- So whenever we call the `fetch function` we can pass a second object argument, and specify the cache control

- To disable caching for a data that changes frequently do this

```ts
fetch(url, { cache: 'no-store' });
```

- To keep data fresh for a certain period of time

```ts
// this means next.js is going to run a background job and get data from the backend every 10 seconds
fetch(url, { next: { revalidate: 10 } });
```

- Note: this caching behaviour is only implemented in the fetch function. so if you use a third party library like axios you're not going to get the data cache

## Static and Dynamic Rendering (these are all types of server side rendering)

In next.js we have another performance optimization technique called `static rendering or Static Site Generation`
`Static Rendering or Static Site Generation`

- The idea of Static Rendering or Static Site Generation is that if we have pages or component that have static data, we can have next.js render them once when we build our application for production (Render @ build time) so next time those pages are needed next.js is not going to re-render them is going to get their content or payload from its cache which is based on the file system. This is is static rendering meaning rendering at build time

`Dynamic Rendering`

- This happens at request time
  NOTE:// whenever we use the fetch function in next.js. It caches or treats the data as unchanging data so when building our application it treats those pages as static data, but if we disable caching it is going to render our page at request time

- when we build our apps for production note the following,
  - a circle on our route means that page is static
  - a lambda sign means that page would be rendered dynamically at request time

## Styling

## Global Styling

- we should only embed styles into the globals.css file only if the css style is applicable to all html elements
- For styles that are specific to a specific page use css modules or tailwindcss

```css
/* this is a new css syntax that detects color mode on the user's machine */
@media (prefers-color-scheme: dark) {
  :root {
    --foreround-color: 255, 255, 255;
  }
}
```

```css
/* class selectors
 id selectors
 attribute selectors
 pseudo class selectors ->
*/
```

### Syling using css modules

- It is a css file that is scoped to a page or a component
- It is a way to prevent styles form clashing or overwriting each other
- The name of the css file needs to end with `.module.css`
- In the module we define classes that are scoped to a specific component
- And of course we can use the same name in another module file without worry that this styles will clash
- the classes that we define are turn into object keys which we can access with the dot notation
- We cannot name our classes with a hyphen, thus it is advised to use camelCase notation
- PostCSS is a tool that transforms our css classnames when we inspect in the dev tools
- PostCSS uses our css class names and generate unique class names that do not clash
- It is best to group css and component file under a folder .eg ProductCard

### Styling using Tailwindcss

- Try daisyui - it is like bootstrap for tailwindcss
- Also learnt how to add new themes to tailwind daisyui

## Routing & Navigation Advanced

Nextjs comes with special files

- page.tsx -> for showing page content
- layout.tsx -> for showing the layout of our webpage
- loading.tsx -> for showing our loading layout
- route.tsx -> for showing api files
- not-found.tsx -> for error 404 pages
- errot.tsx - for showing general custom error pages

- One advance of next13 is that it allows us to co-locate our project files. e.g components in the app folder. This is because such component file are not accessible to the public view
- This is useful so that we can keep generic component files inside of the folder component and files that pertain to a particulear page also next to its corresponding page

### Creating Dynamic Routes

- A dynamic route is a route with a parameter
- For example we want to go to a route /users/id
- This is how you do it you create folder named users and add the root file page.tsx. Next you create folder with name [id] and inside of it you create the file page.tsx
- To access the id value from the route we pass in props into the function and extract the param property
- The params way of accessing props can only be accessed on pages not on components
