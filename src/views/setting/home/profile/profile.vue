<template>
    <div>
        <div class="steupHeaderInfo">
            <div class="bLeft">
                <div class="setup-header-element">
                    <div class="fh-icon_container">
                        <svg class="fh-icon" focusable="false" data-key="orders" aria-hidden="true"
                            viewBox="0 0 1000 1000" part="icon">
                            <g>
                                <path
                                    d="M788 621l-36-17c-5-3-12-3-17 0L520 706c-12 6-27 6-39 0L265 604c-5-3-12-3-17 0l-36 17c-16 8-16 29 0 37l268 127c12 6 27 6 39 0l268-127c17-8 17-30 1-37zm0-140l-37-17c-5-3-12-3-17 0L520 566c-12 6-27 6-39 0L266 464c-5-3-12-3-17 0l-37 17c-16 8-16 29 0 37l268 128c12 6 27 6 39 0l268-127c17-8 17-30 1-38zM212 378l268 127c12 6 27 6 39 0l268-127c16-8 16-29 0-37L519 214c-12-6-27-6-39 0L212 342c-16 7-16 29 0 36z">
                                </path>
                            </g>
                        </svg>
                    </div>
                </div>
                <div class="setup-header-element">
                    <div class="onesetupBreadcrumbs">
                        <a href="#/lightning/setup/SetupOneHome/home" class="breadcrumb">设置</a>
                    </div>
                    <h1 class="breadcrumbDetail">主页</h1>
                </div>
            </div>
        </div>
        <div class="setupcontent">
            <div class="oneAlohaPage">
                
            </div>
        </div>
    </div>
</template>
<style lang="less">
    .steupHeaderInfo {
        padding: 8px 16px;
        margin: 2px 0 12px 0;
        background: #f3f3f3;
        border-bottom: 1px solid #c9c9c9;
        border-radius: 4px;
        background-clip: padding-box;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.10);
        border: 1px solid #c9c9c9;
        position: relative;
        z-index: 1;

        .bLeft {
            .setup-header-element {
                display: inline-block;
                margin-right: 10px;
                vertical-align: top;

                .fh-icon_container {
                    display: inline-block;
                    border-radius: 4px;
                    padding: 7px;
                    color: #fff;
                    background: #2A739E;
                    line-height: 1;

                    .fh-icon {
                        width: 32px;
                        height: 32px;
                        fill: #fff;
                        vertical-align: middle;
                    }
                }

                .onesetupBreadcrumbs {
                    .breadcrumb {
                        font-size: 13px;
                        color: #2574A9;
                        line-height: 1;

                        &:hover {
                            text-decoration: underline;
                        }
                    }
                }

                .breadcrumbDetail {
                    color: #181818;
                    font-weight: 700;
                    font-size: 20px;
                    line-height: 1.5;
                }

                .uiOutputText {
                    padding-top: 8px;
                    font-weight: 300;
                    font-size: 12px;
                }
            }
        }
    }
</style>