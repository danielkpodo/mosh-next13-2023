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
- The `public folder` this is where we can put our assets e.g images

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
- The Link component only fetches the content area which the only necessary part we need for our page

## Client vrs Server Component

In nextjs we have two rendering environments where we can render our component and generate our html markups

- Client (web browser)
- Server (node.js runtime)

- Rendering components on the client is similar to how react applications work (We refer to this technique as client side rendering or CSR in short)
- On the other hand, SSR (Server-side Rendering) -> components are rendered on the server

  ### Differences B/n Client Side Rendering and SSR

  `CSR`

- with client side rendering we have to bundle all our components and send them to the client (web browser): this means as our application grows so does our bundle size grows. The larger the bundle the more resource we need on our ram to load the resource so this approach is resource heavy.
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
