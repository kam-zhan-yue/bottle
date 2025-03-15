/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginImport } from './routes/login'
import { Route as GameImport } from './routes/game'
import { Route as AboutImport } from './routes/about'
import { Route as IndexImport } from './routes/index'
import { Route as GameIndexImport } from './routes/game/index'
import { Route as GameSendImport } from './routes/game/send'
import { Route as GameFishingImport } from './routes/game/fishing'

// Create/Update Routes

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const GameRoute = GameImport.update({
  id: '/game',
  path: '/game',
  getParentRoute: () => rootRoute,
} as any)

const AboutRoute = AboutImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const GameIndexRoute = GameIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => GameRoute,
} as any)

const GameSendRoute = GameSendImport.update({
  id: '/send',
  path: '/send',
  getParentRoute: () => GameRoute,
} as any)

const GameFishingRoute = GameFishingImport.update({
  id: '/fishing',
  path: '/fishing',
  getParentRoute: () => GameRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/game': {
      id: '/game'
      path: '/game'
      fullPath: '/game'
      preLoaderRoute: typeof GameImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/game/fishing': {
      id: '/game/fishing'
      path: '/fishing'
      fullPath: '/game/fishing'
      preLoaderRoute: typeof GameFishingImport
      parentRoute: typeof GameImport
    }
    '/game/send': {
      id: '/game/send'
      path: '/send'
      fullPath: '/game/send'
      preLoaderRoute: typeof GameSendImport
      parentRoute: typeof GameImport
    }
    '/game/': {
      id: '/game/'
      path: '/'
      fullPath: '/game/'
      preLoaderRoute: typeof GameIndexImport
      parentRoute: typeof GameImport
    }
  }
}

// Create and export the route tree

interface GameRouteChildren {
  GameFishingRoute: typeof GameFishingRoute
  GameSendRoute: typeof GameSendRoute
  GameIndexRoute: typeof GameIndexRoute
}

const GameRouteChildren: GameRouteChildren = {
  GameFishingRoute: GameFishingRoute,
  GameSendRoute: GameSendRoute,
  GameIndexRoute: GameIndexRoute,
}

const GameRouteWithChildren = GameRoute._addFileChildren(GameRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/game': typeof GameRouteWithChildren
  '/login': typeof LoginRoute
  '/game/fishing': typeof GameFishingRoute
  '/game/send': typeof GameSendRoute
  '/game/': typeof GameIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/login': typeof LoginRoute
  '/game/fishing': typeof GameFishingRoute
  '/game/send': typeof GameSendRoute
  '/game': typeof GameIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/game': typeof GameRouteWithChildren
  '/login': typeof LoginRoute
  '/game/fishing': typeof GameFishingRoute
  '/game/send': typeof GameSendRoute
  '/game/': typeof GameIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/about'
    | '/game'
    | '/login'
    | '/game/fishing'
    | '/game/send'
    | '/game/'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/about' | '/login' | '/game/fishing' | '/game/send' | '/game'
  id:
    | '__root__'
    | '/'
    | '/about'
    | '/game'
    | '/login'
    | '/game/fishing'
    | '/game/send'
    | '/game/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AboutRoute: typeof AboutRoute
  GameRoute: typeof GameRouteWithChildren
  LoginRoute: typeof LoginRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AboutRoute: AboutRoute,
  GameRoute: GameRouteWithChildren,
  LoginRoute: LoginRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/about",
        "/game",
        "/login"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/game": {
      "filePath": "game.tsx",
      "children": [
        "/game/fishing",
        "/game/send",
        "/game/"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/game/fishing": {
      "filePath": "game/fishing.tsx",
      "parent": "/game"
    },
    "/game/send": {
      "filePath": "game/send.tsx",
      "parent": "/game"
    },
    "/game/": {
      "filePath": "game/index.tsx",
      "parent": "/game"
    }
  }
}
ROUTE_MANIFEST_END */
