import { createRouter, createWebHistory } from "vue-router";

const isAuthenticated = function (to, from, next) {
    if (localStorage.getItem('userRole') === 'USER') {
        next()
    }
    else next({ name: 'main' })
}


const routes = [
    {
        path: '/',
        name: 'main',
        component: () => import('../pages/MainPage.vue'),
    },
    {
        path: '/support',
        name: 'support',
        component: () => import('../pages/SupportPage.vue'),
    },

    {
        path: '/account/',
        name: 'account',
        beforeEnter: isAuthenticated,
        props: true,
        component: () => import('../modules/Account/AccountPage.vue'),
        redirect: '/account/',
        children: [
            {
                // path: 'body',
                path: '',
                name: 'accountBody',
                beforeEnter: isAuthenticated,
                component: () => import('../modules/Account/VAccountBody.vue'),
            },
            {
                // path: 'edit',
                path: '',
                name: 'accountEdit',
                beforeEnter: isAuthenticated,
                component: () => import('../modules/Account/VAccountEditData.vue'),
            },
            {
                // path: 'newProject',
                path: '',
                name: 'newProject',
                beforeEnter: isAuthenticated,
                component: () => import('../modules/Project/VProjectForm.vue'),
            },
            {
                // path: 'newDiscussion',
                path: '',
                name: 'newDiscussion',
                beforeEnter: isAuthenticated,
                component: () => import('../modules/Discussion/VDiscussionForm.vue'),
            },
            {
                path: 'edit/project/:projectId',
                name: 'editProject',
                beforeEnter: isAuthenticated,
                props: true,
                component: () => import('../modules/Project/VProjectForm.vue'),
            },
            {
                path: 'edit/discussion/:discussionId',
                name: 'editDiscussion',
                beforeEnter: isAuthenticated,
                props: true,
                component: () => import('../modules/Discussion/VDiscussionForm.vue'),
            },
            {
                path: 'projects/:userId',
                name: 'userProjects',
                beforeEnter: isAuthenticated,
                props: true,
                component: () => import('../modules/Account/VAccountProjects.vue'),
            },
            {
                path: 'discussions/:userId',
                name: 'userDiscussions',
                beforeEnter: isAuthenticated,
                props: true,
                component: () => import('../modules/Account/VAccountDiscussions.vue'),
            },
            {
                path: 'favorite/:userId',
                name: 'favorite',
                beforeEnter: isAuthenticated,
                props: true,
                component: () => import('../modules/Account/VAccountFavorite.vue'),
            }
        ],
    },

    {
        path: '/user/:userId',
        name: 'user',
        beforeEnter: isAuthenticated,
        props: true,
        component: () => import('../modules/Account/ForeignAccountPage.vue'),
        redirect: '/user/:userId/',
        children: [
            {
                // path: 'body',
                path: '',
                name: 'userBody',
                beforeEnter: isAuthenticated,
                component: () => import('../modules/Account/VForeignAccountBody.vue'),
            },
            {
                path: 'projects/:userId',
                name: 'foreignUserProjects',
                beforeEnter: isAuthenticated,
                props: true,
                component: () => import('../modules/Account/VForeignAccountProjects.vue'),
            },
            {
                path: 'discussions/:userId',
                name: 'foreignUserDiscussions',
                beforeEnter: isAuthenticated,
                props: true,
                component: () => import('../modules/Account/VForeignAccountDiscussions.vue'),
            }
        ],
    },

    {
        path: '/forum-discussions',
        name: 'forum-discussions',
        component: () => import('../pages/ForumDiscussionsPage.vue'),
    },
    {
        path: '/forum-community',
        name: 'forum-community',
        component: () => import('../pages/ForumCommunityPage.vue'),
    },
    {
        path: '/project/:projectId',
        name: 'project',
        props: true,
        component: () => import('../modules/Project/VProjectInfo.vue'),
    },
    {
        path: '/discussion/:discussionId',
        name: 'discussion',
        props: true,
        component: () => import('../modules/Discussion/VDiscussionInfo.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const scrollBehavior = (to, from, savedPosition) => {
    if (savedPosition) {
        return savedPosition;
    } else {
        return { top: 0, behavior: "smooth" };
    }
};

router.beforeEach((to, from, next) => {
    next();
});

router.afterEach((to, from) => {
    window.scrollTo(scrollBehavior(to, from, null));
});

export default router;