'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">@rbac/source documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                                <li class="link">
                                    <a href="overview.html" data-type="chapter-link">
                                        <span class="icon ion-ios-keypad"></span>Overview
                                    </a>
                                </li>

                            <li class="link">
                                <a href="index.html" data-type="chapter-link">
                                    <span class="icon ion-ios-paper"></span>
                                        README
                                </a>
                            </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>

                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-4710697b397297997cda0aac2a41a55346fcb2884b10f7d497c91991e21b3f6a447d6fa265071537e92c3a9191b470f54bf75c38dfbb00b8aa8f4f4269abec7b"' : 'data-bs-target="#xs-injectables-links-module-AppModule-4710697b397297997cda0aac2a41a55346fcb2884b10f7d497c91991e21b3f6a447d6fa265071537e92c3a9191b470f54bf75c38dfbb00b8aa8f4f4269abec7b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-4710697b397297997cda0aac2a41a55346fcb2884b10f7d497c91991e21b3f6a447d6fa265071537e92c3a9191b470f54bf75c38dfbb00b8aa8f4f4269abec7b"' :
                                        'id="xs-injectables-links-module-AppModule-4710697b397297997cda0aac2a41a55346fcb2884b10f7d497c91991e21b3f6a447d6fa265071537e92c3a9191b470f54bf75c38dfbb00b8aa8f4f4269abec7b"' }>
                                        <li class="link">
                                            <a href="injectables/InitializationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InitializationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-d6bd8eebdd83346bf902f5b3a99b0a523a97f8ba860afc46425015404e0c57c91785a5b90fda0ce62a6e4e8240567b55ee7307a646d267b87f16df2c2e67a70e"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-d6bd8eebdd83346bf902f5b3a99b0a523a97f8ba860afc46425015404e0c57c91785a5b90fda0ce62a6e4e8240567b55ee7307a646d267b87f16df2c2e67a70e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-d6bd8eebdd83346bf902f5b3a99b0a523a97f8ba860afc46425015404e0c57c91785a5b90fda0ce62a6e4e8240567b55ee7307a646d267b87f16df2c2e67a70e"' :
                                            'id="xs-controllers-links-module-AuthModule-d6bd8eebdd83346bf902f5b3a99b0a523a97f8ba860afc46425015404e0c57c91785a5b90fda0ce62a6e4e8240567b55ee7307a646d267b87f16df2c2e67a70e"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-d6bd8eebdd83346bf902f5b3a99b0a523a97f8ba860afc46425015404e0c57c91785a5b90fda0ce62a6e4e8240567b55ee7307a646d267b87f16df2c2e67a70e"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-d6bd8eebdd83346bf902f5b3a99b0a523a97f8ba860afc46425015404e0c57c91785a5b90fda0ce62a6e4e8240567b55ee7307a646d267b87f16df2c2e67a70e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-d6bd8eebdd83346bf902f5b3a99b0a523a97f8ba860afc46425015404e0c57c91785a5b90fda0ce62a6e4e8240567b55ee7307a646d267b87f16df2c2e67a70e"' :
                                        'id="xs-injectables-links-module-AuthModule-d6bd8eebdd83346bf902f5b3a99b0a523a97f8ba860afc46425015404e0c57c91785a5b90fda0ce62a6e4e8240567b55ee7307a646d267b87f16df2c2e67a70e"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TaskModule.html" data-type="entity-link" >TaskModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TaskModule-e3298cba9c42d62776700f3e791cb8cc6c5115e448b6923af7c8cb802db203c0d88222a3f9bb892e283577e51d25447b9034d2c01b6d33dfcc3697ccfb794674"' : 'data-bs-target="#xs-controllers-links-module-TaskModule-e3298cba9c42d62776700f3e791cb8cc6c5115e448b6923af7c8cb802db203c0d88222a3f9bb892e283577e51d25447b9034d2c01b6d33dfcc3697ccfb794674"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TaskModule-e3298cba9c42d62776700f3e791cb8cc6c5115e448b6923af7c8cb802db203c0d88222a3f9bb892e283577e51d25447b9034d2c01b6d33dfcc3697ccfb794674"' :
                                            'id="xs-controllers-links-module-TaskModule-e3298cba9c42d62776700f3e791cb8cc6c5115e448b6923af7c8cb802db203c0d88222a3f9bb892e283577e51d25447b9034d2c01b6d33dfcc3697ccfb794674"' }>
                                            <li class="link">
                                                <a href="controllers/TaskController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TaskModule-e3298cba9c42d62776700f3e791cb8cc6c5115e448b6923af7c8cb802db203c0d88222a3f9bb892e283577e51d25447b9034d2c01b6d33dfcc3697ccfb794674"' : 'data-bs-target="#xs-injectables-links-module-TaskModule-e3298cba9c42d62776700f3e791cb8cc6c5115e448b6923af7c8cb802db203c0d88222a3f9bb892e283577e51d25447b9034d2c01b6d33dfcc3697ccfb794674"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TaskModule-e3298cba9c42d62776700f3e791cb8cc6c5115e448b6923af7c8cb802db203c0d88222a3f9bb892e283577e51d25447b9034d2c01b6d33dfcc3697ccfb794674"' :
                                        'id="xs-injectables-links-module-TaskModule-e3298cba9c42d62776700f3e791cb8cc6c5115e448b6923af7c8cb802db203c0d88222a3f9bb892e283577e51d25447b9034d2c01b6d33dfcc3697ccfb794674"' }>
                                        <li class="link">
                                            <a href="injectables/TaskService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-badd53bcdc4b6a8a29eabb921be6a5db07836a5544cac87e4a25ed1682bf9d71e343efe74622ca5bc25f4f3c5c16f4d2885a208d74e185f5dfa2786ac1e207cb"' : 'data-bs-target="#xs-injectables-links-module-UserModule-badd53bcdc4b6a8a29eabb921be6a5db07836a5544cac87e4a25ed1682bf9d71e343efe74622ca5bc25f4f3c5c16f4d2885a208d74e185f5dfa2786ac1e207cb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-badd53bcdc4b6a8a29eabb921be6a5db07836a5544cac87e4a25ed1682bf9d71e343efe74622ca5bc25f4f3c5c16f4d2885a208d74e185f5dfa2786ac1e207cb"' :
                                        'id="xs-injectables-links-module-UserModule-badd53bcdc4b6a8a29eabb921be6a5db07836a5544cac87e4a25ed1682bf9d71e343efe74622ca5bc25f4f3c5c16f4d2885a208d74e185f5dfa2786ac1e207cb"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TaskController.html" data-type="entity-link" >TaskController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuditLogInterceptor.html" data-type="entity-link" >AuditLogInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InitializationService.html" data-type="entity-link" >InitializationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link" >LocalStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TaskService.html" data-type="entity-link" >TaskService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});