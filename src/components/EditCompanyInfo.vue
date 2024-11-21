<template>
    <div>
        <div class="panelTableBox">
            <div class="panelTableHead">
                <span class="label">组织编辑</span>
            </div>
            <a-form :label-col="labelCol">
                <div class="section">
                    <div class="sectionHead">
                        <span class="label">一般信息</span>
                    </div>
                    <div class="sectionBd">
                        <div class="sectionRow">
                            <div class="sectionItem">
                                <a-form-item label="组织名" :rules="[{ required: true, message: '请输入组织名!' }]">
                                    <a-input></a-input>
                                </a-form-item>
                            </div>
                            <div class="sectionItem">
                                <a-form-item label="电话">
                                    <a-input></a-input>
                                </a-form-item>
                            </div>
                        </div>
                        <div class="sectionRow">
                            <div class="sectionItem">
                                <a-form-item label="主要联系人">
                                    <a-input></a-input>
                                </a-form-item>
                            </div>
                            <div class="sectionItem">
                                <a-form-item label="传真">
                                    <a-input></a-input>
                                </a-form-item>
                            </div>
                        </div>
                        <div class="sectionRow">
                            <div class="sectionItem">
                                <a-form-item label="分部">
                                    <a-input></a-input>
                                </a-form-item>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="section">
                    <div class="sectionHead">
                        <span class="label">地址</span>
                    </div>
                    <div class="sectionBd">
                        <div class="sectionRow">
                            <div class="sectionItem">
                                <a-form-item label="国家/地区">
                                    <a-input></a-input>
                                </a-form-item>
                            </div>
                        </div>
                        <div class="sectionRow">
                            <div class="sectionItem">
                                <a-form-item label="州/省">
                                    <a-input></a-input>
                                </a-form-item>
                            </div>
                        </div>
                        <div class="sectionRow">
                            <div class="sectionItem">
                                <a-form-item label="城市">
                                    <a-input></a-input>
                                </a-form-item>
                            </div>
                        </div>
                        <div class="sectionRow">
                            <div class="sectionItem">
                                <a-form-item label="街道">
                                    <a-input></a-input>
                                </a-form-item>
                            </div>
                        </div>
                        <div class="sectionRow">
                            <div class="sectionItem">
                                <a-form-item label="邮政编码">
                                    <a-input></a-input>
                                </a-form-item>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="section">
                    <div class="sectionHead">
                        <span class="label">区域设置</span>
                    </div>
                    <div class="sectionBd">
                        <div class="sectionRow">
                            <div class="sectionItem">
                                <a-form-item label="默认区域" :rules="[{ required: true, message: '请输入组织名!' }]">
                                    <a-select>
                                        <a-select-option value="21" selected="selected">中文 (中国)</a-select-option>
                                        <a-select-option value="172">中文 (中国澳门特别行政区)</a-select-option>
                                        <a-select-option value="62">中文 (中国香港特别行政区)</a-select-option>
                                        <a-select-option value="27">中文 (台湾)</a-select-option>
                                        <a-select-option value="173">中文 (新加坡)</a-select-option>
                                        <a-select-option value="189">中文（中国，拼音顺序）</a-select-option>
                                        <a-select-option value="186">中文（中国，笔画顺序）</a-select-option>
                                        <a-select-option value="187">中文（台湾，笔画顺序）</a-select-option>
                                        <a-select-option value="188">中文（香港特别行政区，笔画顺序）</a-select-option>
                                        <a-select-option value="4">丹麦语 (丹麦)</a-select-option>
                                        <a-select-option value="116">乌克兰语 (乌克兰)</a-select-option>
                                        <a-select-option value="303">乌兹别克语 (LATN,UZ)</a-select-option>
                                        <a-select-option value="110">乌尔都语 (巴基斯坦)</a-select-option>
                                        <a-select-option value="97">亚美尼亚语 (亚美尼亚)</a-select-option>
                                        <a-select-option value="126">他加禄语 (菲律宾)</a-select-option>
                                        <a-select-option value="117">俄语 (俄罗斯)</a-select-option>
                                        <a-select-option value="326">俄语 (哈萨克斯坦)</a-select-option>
                                        <a-select-option value="77">保加利亚语 (保加利亚)</a-select-option>
                                        <a-select-option value="96">克罗地亚语 (克罗地亚)</a-select-option>
                                        <a-select-option value="98">冰岛语 (冰岛)</a-select-option>
                                        <a-select-option value="30">加泰罗尼亚语 (西班牙)</a-select-option>
                                        <a-select-option value="183">匈牙利语 (匈牙利)</a-select-option>
                                        <a-select-option value="318">南非荷兰语 (南非)</a-select-option>
                                        <a-select-option value="322">卡纳达语 (印度)</a-select-option>
                                        <a-select-option value="179">卢森堡语 (卢森堡)</a-select-option>
                                        <a-select-option value="164">印地语 (印度)</a-select-option>
                                        <a-select-option value="184">印度尼西亚语 (印度尼西亚)</a-select-option>
                                        <a-select-option value="324">古吉拉特语 (印度)</a-select-option>
                                        <a-select-option value="100">哈萨克语 (哈萨克斯坦)</a-select-option>
                                        <a-select-option value="185">土耳其语 (土耳其)</a-select-option>
                                        <a-select-option value="169">塔吉克语 (塔吉克斯坦)</a-select-option>
                                        <a-select-option value="314">塞尔维亚语 (塞尔维亚)</a-select-option>
                                        <a-select-option value="137">塞尔维亚语（拉丁）（塞尔维亚）</a-select-option>
                                        <a-select-option value="138">塞尔维亚语（拉丁）（波斯尼亚和黑塞哥维那）</a-select-option>
                                        <a-select-option value="131">塞尔维亚语（西里尔）（塞尔维亚）</a-select-option>
                                        <a-select-option value="132">塞尔维亚语（西里尔）（波斯尼亚和黑塞哥维那）</a-select-option>
                                        <a-select-option value="161">威尔士语 (英国)</a-select-option>
                                        <a-select-option value="325">孟加拉语 (印度)</a-select-option>
                                        <a-select-option value="166">孟加拉语 (孟加拉国)</a-select-option>
                                        <a-select-option value="262">宗卡语 (不丹)</a-select-option>
                                        <a-select-option value="306">尼泊尔语 (尼泊尔)</a-select-option>
                                        <a-select-option value="153">巴斯克语 (西班牙)</a-select-option>
                                        <a-select-option value="99">希伯来语 (以色列)</a-select-option>
                                        <a-select-option value="9">希腊语 (希腊)</a-select-option>
                                        <a-select-option value="8">德语 (卢森堡)</a-select-option>
                                        <a-select-option value="5">德语 (奥地利)</a-select-option>
                                        <a-select-option value="7">德语 (德国)</a-select-option>
                                        <a-select-option value="315">德语 (比利时)</a-select-option>
                                        <a-select-option value="6">德语 (瑞士)</a-select-option>
                                        <a-select-option value="19">意大利语 (意大利)</a-select-option>
                                        <a-select-option value="18">意大利语 (瑞士)</a-select-option>
                                        <a-select-option value="103">拉脱维亚语 (拉脱维亚)</a-select-option>
                                        <a-select-option value="24">挪威语 (挪威)</a-select-option>
                                        <a-select-option value="32">捷克语 (捷克)</a-select-option>
                                        <a-select-option value="278">提格利尼亚语 (埃塞俄比亚)</a-select-option>
                                        <a-select-option value="108">斯洛伐克语 (斯洛伐克)</a-select-option>
                                        <a-select-option value="109">斯洛文尼亚语 (斯洛文尼亚)</a-select-option>
                                        <a-select-option value="316">斯瓦希里语 (肯尼亚)</a-select-option>
                                        <a-select-option value="20">日语 (日本)</a-select-option>
                                        <a-select-option value="305">普什图语 (阿富汗)</a-select-option>
                                        <a-select-option value="163">柯尔克孜语 (吉尔吉斯斯坦)</a-select-option>
                                        <a-select-option value="129">格鲁吉亚语 (格鲁吉亚)</a-select-option>
                                        <a-select-option value="216">毛利语 (新西兰)</a-select-option>
                                        <a-select-option value="288">法语 (几内亚)</a-select-option>
                                        <a-select-option value="14">法语 (加拿大)</a-select-option>
                                        <a-select-option value="17">法语 (卢森堡)</a-select-option>
                                        <a-select-option value="95">法语 (摩纳哥)</a-select-option>
                                        <a-select-option value="13">法语 (比利时)</a-select-option>
                                        <a-select-option value="284">法语 (毛里塔尼亚)</a-select-option>
                                        <a-select-option value="16">法语 (法国)</a-select-option>
                                        <a-select-option value="263">法语 (海地)</a-select-option>
                                        <a-select-option value="15">法语 (瑞士)</a-select-option>
                                        <a-select-option value="281">法语 (瓦利斯和富图纳)</a-select-option>
                                        <a-select-option value="287">法语 (科摩罗)</a-select-option>
                                        <a-select-option value="182">波兰语 (波兰)</a-select-option>
                                        <a-select-option value="140">波斯尼亚语 (波斯尼亚和黑塞哥维那)</a-select-option>
                                        <a-select-option value="274">波斯语 (伊朗)</a-select-option>
                                        <a-select-option value="320">泰卢固语 (印度)</a-select-option>
                                        <a-select-option value="192">泰米尔语 (印度)</a-select-option>
                                        <a-select-option value="259">泰米尔语 (斯里兰卡)</a-select-option>
                                        <a-select-option value="68">泰语 (泰国)</a-select-option>
                                        <a-select-option value="157">爱尔兰语 (爱尔兰)</a-select-option>
                                        <a-select-option value="94">爱沙尼亚语 (爱沙尼亚)</a-select-option>
                                        <a-select-option value="26">瑞典语 (瑞典)</a-select-option>
                                        <a-select-option value="168">白俄罗斯语 (白俄罗斯)</a-select-option>
                                        <a-select-option value="319">祖鲁语 (南非)</a-select-option>
                                        <a-select-option value="317">科萨语 (南非)</a-select-option>
                                        <a-select-option value="102">立陶宛语 (立陶宛)</a-select-option>
                                        <a-select-option value="261">索马里语 (吉布提)</a-select-option>
                                        <a-select-option value="308">索马里语 (索马里)</a-select-option>
                                        <a-select-option value="295">约鲁巴语 (贝宁)</a-select-option>
                                        <a-select-option value="290">缅甸语 (缅甸)</a-select-option>
                                        <a-select-option value="177">罗曼什语 (瑞士)</a-select-option>
                                        <a-select-option value="143">罗马尼亚语 (摩尔多瓦)</a-select-option>
                                        <a-select-option value="107">罗马尼亚语 (罗马尼亚)</a-select-option>
                                        <a-select-option value="309">老挝语 (老挝)</a-select-option>
                                        <a-select-option value="12">芬兰语 (芬兰)</a-select-option>
                                        <a-select-option value="202">英语 (中国香港特别行政区)</a-select-option>
                                        <a-select-option value="256">英语 (乌干达)</a-select-option>
                                        <a-select-option value="298">英语 (伯利兹)</a-select-option>
                                        <a-select-option value="301">英语 (冈比亚)</a-select-option>
                                        <a-select-option value="296">英语 (利比里亚)</a-select-option>
                                        <a-select-option value="3">英语 (加拿大)</a-select-option>
                                        <a-select-option value="80">英语 (加纳)</a-select-option>
                                        <a-select-option value="40">英语 (南非)</a-select-option>
                                        <a-select-option value="275">英语 (博茨瓦纳)</a-select-option>
                                        <a-select-option value="273">英语 (卢旺达)</a-select-option>
                                        <a-select-option value="127">英语 (印度)</a-select-option>
                                        <a-select-option value="81">英语 (印度尼西亚)</a-select-option>
                                        <a-select-option value="269">英语 (厄立特里亚)</a-select-option>
                                        <a-select-option value="302">英语 (喀麦隆)</a-select-option>
                                        <a-select-option value="260">英语 (圣赫勒拿)</a-select-option>
                                        <a-select-option value="304">英语 (圭亚那)</a-select-option>
                                        <a-select-option value="312">英语 (坦桑尼亚)</a-select-option>
                                        <a-select-option value="265">英语 (塞拉利昂)</a-select-option>
                                        <a-select-option value="266">英语 (塞舌尔)</a-select-option>
                                        <a-select-option value="271">英语 (安提瓜和巴布达)</a-select-option>
                                        <a-select-option value="121">英语 (尼日利亚)</a-select-option>
                                        <a-select-option value="276">英语 (巴哈马)</a-select-option>
                                        <a-select-option value="165">英语 (巴基斯坦)</a-select-option>
                                        <a-select-option value="78">英语 (巴巴多斯)</a-select-option>
                                        <a-select-option value="270">英语 (巴布亚新几内亚)</a-select-option>
                                        <a-select-option value="257">英语 (开曼群岛)</a-select-option>
                                        <a-select-option value="289">英语 (所罗门群岛)</a-select-option>
                                        <a-select-option value="279">英语 (斐济)</a-select-option>
                                        <a-select-option value="310">英语 (斯威士兰)</a-select-option>
                                        <a-select-option value="82">英语 (新加坡)</a-select-option>
                                        <a-select-option value="39">英语 (新西兰)</a-select-option>
                                        <a-select-option value="297">英语 (毛里求斯)</a-select-option>
                                        <a-select-option value="311">英语 (汤加)</a-select-option>
                                        <a-select-option value="37">英语 (澳大利亚)</a-select-option>
                                        <a-select-option value="10">英语 (爱尔兰)</a-select-option>
                                        <a-select-option value="282">英语 (牙买加)</a-select-option>
                                        <a-select-option value="258">英语 (特立尼达和多巴哥)</a-select-option>
                                        <a-select-option value="277">英语 (瓦努阿图)</a-select-option>
                                        <a-select-option value="79">英语 (百慕大)</a-select-option>
                                        <a-select-option value="272">英语 (直布罗陀)</a-select-option>
                                        <a-select-option value="267">英语 (福克兰群岛)</a-select-option>
                                        <a-select-option value="307">英语 (纳米比亚)</a-select-option>
                                        <a-select-option value="1">英语 (美国)</a-select-option>
                                        <a-select-option value="292">英语 (肯尼亚)</a-select-option>
                                        <a-select-option value="2">英语 (英国)</a-select-option>
                                        <a-select-option value="264">英语 (荷属圣马丁)</a-select-option>
                                        <a-select-option value="124">英语 (菲律宾)</a-select-option>
                                        <a-select-option value="285">英语 (萨摩亚)</a-select-option>
                                        <a-select-option value="268">英语 (马拉维)</a-select-option>
                                        <a-select-option value="135">英语 (马来西亚)</a-select-option>
                                        <a-select-option value="283">英语 (马达加斯加)</a-select-option>
                                        <a-select-option value="22">荷兰语 (比利时)</a-select-option>
                                        <a-select-option value="105">荷兰语 (苏里南)</a-select-option>
                                        <a-select-option value="23">荷兰语 (荷兰)</a-select-option>
                                        <a-select-option value="293">荷兰语 (阿鲁巴)</a-select-option>
                                        <a-select-option value="291">葡萄牙语 (佛得角)</a-select-option>
                                        <a-select-option value="280">葡萄牙语 (圣多美和普林西比)</a-select-option>
                                        <a-select-option value="106">葡萄牙语 (安哥拉)</a-select-option>
                                        <a-select-option value="64">葡萄牙语 (巴西)</a-select-option>
                                        <a-select-option value="294">葡萄牙语 (莫桑比克)</a-select-option>
                                        <a-select-option value="25">葡萄牙语 (葡萄牙)</a-select-option>
                                        <a-select-option value="93">西班牙语 (乌拉圭)</a-select-option>
                                        <a-select-option value="87">西班牙语 (危地马拉)</a-select-option>
                                        <a-select-option value="86">西班牙语 (厄瓜多尔)</a-select-option>
                                        <a-select-option value="300">西班牙语 (古巴)</a-select-option>
                                        <a-select-option value="43">西班牙语 (哥伦比亚)</a-select-option>
                                        <a-select-option value="85">西班牙语 (哥斯达黎加)</a-select-option>
                                        <a-select-option value="120">西班牙语 (多米尼加共和国)</a-select-option>
                                        <a-select-option value="46">西班牙语 (委内瑞拉)</a-select-option>
                                        <a-select-option value="203">西班牙语 (尼加拉瓜)</a-select-option>
                                        <a-select-option value="91">西班牙语 (巴拉圭)</a-select-option>
                                        <a-select-option value="123">西班牙语 (巴拿马)</a-select-option>
                                        <a-select-option value="84">西班牙语 (智利)</a-select-option>
                                        <a-select-option value="90">西班牙语 (波多黎各)</a-select-option>
                                        <a-select-option value="88">西班牙语 (洪都拉斯)</a-select-option>
                                        <a-select-option value="83">西班牙语 (玻利维亚)</a-select-option>
                                        <a-select-option value="89">西班牙语 (秘鲁)</a-select-option>
                                        <a-select-option value="204">西班牙语 (美国)</a-select-option>
                                        <a-select-option value="92">西班牙语 (萨尔瓦多)</a-select-option>
                                        <a-select-option value="11">西班牙语 (西班牙)</a-select-option>
                                        <a-select-option value="42">西班牙语 (阿根廷)</a-select-option>
                                        <a-select-option value="45">西班牙语 (墨西哥)</a-select-option>
                                        <a-select-option value="111">越南语 (越南)</a-select-option>
                                        <a-select-option value="162">阿塞拜疆语 (阿塞拜疆)</a-select-option>
                                        <a-select-option value="150">阿尔巴尼亚语 (阿尔巴尼亚)</a-select-option>
                                        <a-select-option value="201">阿拉伯语 (也门)</a-select-option>
                                        <a-select-option value="194">阿拉伯语 (伊拉克)</a-select-option>
                                        <a-select-option value="195">阿拉伯语 (利比亚)</a-select-option>
                                        <a-select-option value="167">阿拉伯语 (卡塔尔)</a-select-option>
                                        <a-select-option value="199">阿拉伯语 (叙利亚)</a-select-option>
                                        <a-select-option value="122">阿拉伯语 (埃及)</a-select-option>
                                        <a-select-option value="72">阿拉伯语 (巴林)</a-select-option>
                                        <a-select-option value="196">阿拉伯语 (摩洛哥)</a-select-option>
                                        <a-select-option value="76">阿拉伯语 (沙特阿拉伯)</a-select-option>
                                        <a-select-option value="74">阿拉伯语 (科威特)</a-select-option>
                                        <a-select-option value="200">阿拉伯语 (突尼斯)</a-select-option>
                                        <a-select-option value="73">阿拉伯语 (约旦)</a-select-option>
                                        <a-select-option value="198">阿拉伯语 (苏丹)</a-select-option>
                                        <a-select-option value="193">阿拉伯语 (阿尔及利亚)</a-select-option>
                                        <a-select-option value="71">阿拉伯语 (阿拉伯联合酋长国)</a-select-option>
                                        <a-select-option value="197">阿拉伯语 (阿曼)</a-select-option>
                                        <a-select-option value="75">阿拉伯语 (黎巴嫩)</a-select-option>
                                        <a-select-option value="286">隆迪语 (布隆迪)</a-select-option>
                                        <a-select-option value="313">韩语 (朝鲜)</a-select-option>
                                        <a-select-option value="63">韩语 (韩国)</a-select-option>
                                        <a-select-option value="145">马其顿语 (北马其顿)</a-select-option>
                                        <a-select-option value="323">马拉地语 (印度)</a-select-option>
                                        <a-select-option value="321">马拉雅拉姆语 (印度)</a-select-option>
                                        <a-select-option value="171">马来语 (文莱)</a-select-option>
                                        <a-select-option value="104">马来语 (马来西亚)</a-select-option>
                                        <a-select-option value="155">马耳他语 (马耳他)</a-select-option>
                                        <a-select-option value="101">高棉语 (柬埔寨)</a-select-option>
                                        <a-select-option value="299">鲁巴加丹加语 (刚果（金）)</a-select-option>
                                        <a-select-option value="327">黑山语（黑山，USD）</a-select-option>
                                        <a-select-option value="158">黑山语（黑山）</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </div>
                        </div>
                        <div class="sectionRow">
                            <div class="sectionItem">
                                <a-form-item label="默认语言" :rules="[{ required: true, message: '请输入组织名!' }]">
                                    <a-select>
                                        <a-select-option value="1">英语</a-select-option>
                                        <a-select-option value="33">德语</a-select-option>
                                        <a-select-option value="41">西班牙语</a-select-option>
                                        <a-select-option value="48">法语</a-select-option>
                                        <a-select-option value="50">意大利语</a-select-option>
                                        <a-select-option value="52">日语</a-select-option>
                                        <a-select-option value="58">瑞典语</a-select-option>
                                        <a-select-option value="53">韩语</a-select-option>
                                        <a-select-option value="27">中文（繁体）</a-select-option>
                                        <a-select-option value="21" selected="selected">中文（简体）</a-select-option>
                                        <a-select-option value="64">葡萄牙语（巴西）</a-select-option>
                                        <a-select-option value="23">荷兰语</a-select-option>
                                        <a-select-option value="70">丹麦语</a-select-option>
                                        <a-select-option value="59">泰语</a-select-option>
                                        <a-select-option value="66">芬兰语</a-select-option>
                                        <a-select-option value="57">俄语</a-select-option>
                                        <a-select-option value="45">西班牙语（墨西哥）</a-select-option>
                                        <a-select-option value="54">挪威语</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </div>
                        </div>
                        <div class="sectionRow">
                            <div class="sectionItem">
                                <a-form-item label="默认时区" :rules="[{ required: true, message: '请输入组织名!' }]">
                                    <a-select id="TimeZoneSidKey" name="TimeZoneSidKey" tabindex="13">
                                        <a-select-option value="80">(GMT+14:00) 莱恩群岛时间 (Pacific/Kiritimati)</a-select-option>
                                        <a-select-option value="75">(GMT+13:45) 查坦夏令时间 (Pacific/Chatham)</a-select-option>
                                        <a-select-option value="74">(GMT+13:00) 新西兰夏令时间 (Pacific/Auckland)</a-select-option>
                                        <a-select-option value="76">(GMT+13:00) 菲尼克斯群岛时间 (Pacific/Enderbury)</a-select-option>
                                        <a-select-option value="84">(GMT+13:00) 汤加标准时间 (Pacific/Tongatapu)</a-select-option>
                                        <a-select-option value="31">(GMT+12:00) 彼得罗巴甫洛夫斯克-堪察加标准时间 (Asia/Kamchatka)</a-select-option>
                                        <a-select-option value="77">(GMT+12:00) 斐济标准时间 (Pacific/Fiji)</a-select-option>
                                        <a-select-option value="82">(GMT+12:00) 诺福克岛时间 (Pacific/Norfolk)</a-select-option>
                                        <a-select-option value="54">(GMT+11:00) 豪勋爵岛夏令时间 (Australia/Lord_Howe)</a-select-option>
                                        <a-select-option value="56">(GMT+11:00) 澳大利亚东部夏令时间 (Australia/Sydney)</a-select-option>
                                        <a-select-option value="78">(GMT+11:00) 所罗门群岛时间 (Pacific/Guadalcanal)</a-select-option>
                                        <a-select-option value="51">(GMT+10:30) 澳大利亚中部夏令时间 (Australia/Adelaide)</a-select-option>
                                        <a-select-option value="52">(GMT+10:00) 澳大利亚东部标准时间 (Australia/Brisbane)</a-select-option>
                                        <a-select-option value="53">(GMT+09:30) 澳大利亚中部标准时间 (Australia/Darwin)</a-select-option>
                                        <a-select-option value="40">(GMT+09:00) 韩国标准时间 (Asia/Seoul)</a-select-option>
                                        <a-select-option value="46">(GMT+09:00) 日本标准时间 (Asia/Tokyo)</a-select-option>
                                        <a-select-option value="27">(GMT+08:00) 香港标准时间 (Asia/Hong_Kong)</a-select-option>
                                        <a-select-option value="34">(GMT+08:00) 马来西亚时间 (Asia/Kuala_Lumpur)</a-select-option>
                                        <a-select-option value="36">(GMT+08:00) 菲律宾标准时间 (Asia/Manila)</a-select-option>
                                        <a-select-option value="57" selected="selected">(GMT+08:00) 中国标准时间 (Asia/Shanghai)</a-select-option>
                                        <a-select-option value="41">(GMT+08:00) 新加坡标准时间 (Asia/Singapore)</a-select-option>
                                        <a-select-option value="42">(GMT+08:00) 台北标准时间 (Asia/Taipei)</a-select-option>
                                        <a-select-option value="55">(GMT+08:00) 澳大利亚西部标准时间 (Australia/Perth)</a-select-option>
                                        <a-select-option value="22">(GMT+07:00) 印度支那时间 (Asia/Bangkok)</a-select-option>
                                        <a-select-option value="39">(GMT+07:00) 印度支那时间 (Asia/Ho_Chi_Minh)</a-select-option>
                                        <a-select-option value="28">(GMT+07:00) 印度尼西亚西部时间 (Asia/Jakarta)</a-select-option>
                                        <a-select-option value="37">(GMT+06:30) 缅甸时间 (Asia/Rangoon)</a-select-option>
                                        <a-select-option value="25">(GMT+06:00) 孟加拉标准时间 (Asia/Dhaka)</a-select-option>
                                        <a-select-option value="33">(GMT+05:45) 尼泊尔时间 (Asia/Kathmandu)</a-select-option>
                                        <a-select-option value="24">(GMT+05:30) 印度时间 (Asia/Colombo)</a-select-option>
                                        <a-select-option value="23">(GMT+05:30) 印度时间 (Asia/Kolkata)</a-select-option>
                                        <a-select-option value="32">(GMT+05:00) 巴基斯坦标准时间 (Asia/Karachi)</a-select-option>
                                        <a-select-option value="43">(GMT+05:00) 乌兹别克斯坦标准时间 (Asia/Tashkent)</a-select-option>
                                        <a-select-option value="47">(GMT+05:00) 叶卡捷琳堡标准时间 (Asia/Yekaterinburg)</a-select-option>
                                        <a-select-option value="30">(GMT+04:30) 阿富汗时间 (Asia/Kabul)</a-select-option>
                                        <a-select-option value="45">(GMT+04:30) 伊朗夏令时间 (Asia/Tehran)</a-select-option>
                                        <a-select-option value="91">(GMT+04:00) 阿塞拜疆标准时间 (Asia/Baku)</a-select-option>
                                        <a-select-option value="26">(GMT+04:00) 海湾标准时间 (Asia/Dubai)</a-select-option>
                                        <a-select-option value="44">(GMT+04:00) 格鲁吉亚标准时间 (Asia/Tbilisi)</a-select-option>
                                        <a-select-option value="93">(GMT+04:00) 亚美尼亚标准时间 (Asia/Yerevan)</a-select-option>
                                        <a-select-option value="3">(GMT+03:00) 东部非洲时间 (Africa/Nairobi)</a-select-option>
                                        <a-select-option value="21">(GMT+03:00) 阿拉伯标准时间 (Asia/Baghdad)</a-select-option>
                                        <a-select-option value="29">(GMT+03:00) 以色列夏令时间 (Asia/Jerusalem)</a-select-option>
                                        <a-select-option value="35">(GMT+03:00) 阿拉伯标准时间 (Asia/Kuwait)</a-select-option>
                                        <a-select-option value="38">(GMT+03:00) 阿拉伯标准时间 (Asia/Riyadh)</a-select-option>
                                        <a-select-option value="65">(GMT+03:00) Europe/Istanbul</a-select-option>
                                        <a-select-option value="68">(GMT+03:00) 莫斯科标准时间 (Europe/Minsk)</a-select-option>
                                        <a-select-option value="69">(GMT+03:00) 莫斯科标准时间 (Europe/Moscow)</a-select-option>
                                        <a-select-option value="1">(GMT+02:00) 东欧标准时间 (Africa/Cairo)</a-select-option>
                                        <a-select-option value="2">(GMT+02:00) 南非标准时间 (Africa/Johannesburg)</a-select-option>
                                        <a-select-option value="90">(GMT+02:00) 东欧标准时间 (Asia/Beirut)</a-select-option>
                                        <a-select-option value="59">(GMT+02:00) 东欧标准时间 (Europe/Athens)</a-select-option>
                                        <a-select-option value="62">(GMT+02:00) 东欧标准时间 (Europe/Bucharest)</a-select-option>
                                        <a-select-option value="64">(GMT+02:00) 东欧标准时间 (Europe/Helsinki)</a-select-option>
                                        <a-select-option value="88">(GMT+01:00) 中欧标准时间 (Africa/Algiers)</a-select-option>
                                        <a-select-option value="92">(GMT+01:00) Africa/Casablanca</a-select-option>
                                        <a-select-option value="58">(GMT+01:00) 中欧标准时间 (Europe/Amsterdam)</a-select-option>
                                        <a-select-option value="60">(GMT+01:00) 中欧标准时间 (Europe/Berlin)</a-select-option>
                                        <a-select-option value="61">(GMT+01:00) 中欧标准时间 (Europe/Brussels)</a-select-option>
                                        <a-select-option value="70">(GMT+01:00) 中欧标准时间 (Europe/Paris)</a-select-option>
                                        <a-select-option value="71">(GMT+01:00) 中欧标准时间 (Europe/Prague)</a-select-option>
                                        <a-select-option value="72">(GMT+01:00) 中欧标准时间 (Europe/Rome)</a-select-option>
                                        <a-select-option value="63">(GMT+00:00) 格林尼治标准时间 (Europe/Dublin)</a-select-option>
                                        <a-select-option value="66">(GMT+00:00) 西欧标准时间 (Europe/Lisbon)</a-select-option>
                                        <a-select-option value="67">(GMT+00:00) 格林尼治标准时间 (Europe/London)</a-select-option>
                                        <a-select-option value="73">(GMT+00:00) 格林尼治标准时间 (GMT)</a-select-option>
                                        <a-select-option value="98">(GMT-01:00) 格陵兰岛东部标准时间 (America/Scoresbysund)</a-select-option>
                                        <a-select-option value="94">(GMT-01:00) 亚速尔群岛标准时间 (Atlantic/Azores)</a-select-option>
                                        <a-select-option value="49">(GMT-01:00) 佛得角标准时间 (Atlantic/Cape_Verde)</a-select-option>
                                        <a-select-option value="50">(GMT-02:00) 南乔治亚岛时间 (Atlantic/South_Georgia)</a-select-option>
                                        <a-select-option value="19">(GMT-02:30) 纽芬兰夏令时间 (America/St_Johns)</a-select-option>
                                        <a-select-option value="6">(GMT-03:00) 阿根廷标准时间 (America/Argentina/Buenos_Aires)</a-select-option>
                                        <a-select-option value="10">(GMT-03:00) 大西洋夏令时间 (America/Halifax)</a-select-option>
                                        <a-select-option value="87">(GMT-03:00) 智利夏令时间 (America/Santiago)</a-select-option>
                                        <a-select-option value="18">(GMT-03:00) 巴西利亚标准时间 (America/Sao_Paulo)</a-select-option>
                                        <a-select-option value="48">(GMT-03:00) 大西洋夏令时间 (Atlantic/Bermuda)</a-select-option>
                                        <a-select-option value="7">(GMT-04:00) 委内瑞拉时间 (America/Caracas)</a-select-option>
                                        <a-select-option value="85">(GMT-04:00) 北美东部夏令时间 (America/Indiana/Indianapolis)</a-select-option>
                                        <a-select-option value="14">(GMT-04:00) 北美东部夏令时间 (America/New_York)</a-select-option>
                                        <a-select-option value="17">(GMT-04:00) 大西洋标准时间 (America/Puerto_Rico)</a-select-option>
                                        <a-select-option value="5">(GMT-05:00) 哥伦比亚标准时间 (America/Bogota)</a-select-option>
                                        <a-select-option value="8">(GMT-05:00) 北美中部夏令时间 (America/Chicago)</a-select-option>
                                        <a-select-option value="11">(GMT-05:00) 秘鲁标准时间 (America/Lima)</a-select-option>
                                        <a-select-option value="15">(GMT-05:00) 北美东部标准时间 (America/Panama)</a-select-option>
                                        <a-select-option value="9">(GMT-06:00) 北美山区夏令时间 (America/Denver)</a-select-option>
                                        <a-select-option value="86">(GMT-06:00) 北美中部标准时间 (America/El_Salvador)</a-select-option>
                                        <a-select-option value="13">(GMT-06:00) 北美中部标准时间 (America/Mexico_City)</a-select-option>
                                        <a-select-option value="12">(GMT-07:00) 北美太平洋夏令时间 (America/Los_Angeles)</a-select-option>
                                        <a-select-option value="100">(GMT-07:00) 墨西哥太平洋标准时间 (America/Mazatlan)</a-select-option>
                                        <a-select-option value="16">(GMT-07:00) 北美山区标准时间 (America/Phoenix)</a-select-option>
                                        <a-select-option value="20">(GMT-07:00) 北美太平洋夏令时间 (America/Tijuana)</a-select-option>
                                        <a-select-option value="4">(GMT-08:00) 阿拉斯加夏令时间 (America/Anchorage)</a-select-option>
                                        <a-select-option value="95">(GMT-08:00) 皮特凯恩时间 (Pacific/Pitcairn)</a-select-option>
                                        <a-select-option value="97">(GMT-09:00) 夏威夷-阿留申夏令时间 (America/Adak)</a-select-option>
                                        <a-select-option value="96">(GMT-09:00) 甘比尔时间 (Pacific/Gambier)</a-select-option>
                                        <a-select-option value="99">(GMT-09:30) 马克萨斯群岛时间 (Pacific/Marquesas)</a-select-option>
                                        <a-select-option value="79">(GMT-10:00) 夏威夷-阿留申标准时间 (Pacific/Honolulu)</a-select-option>
                                        <a-select-option value="81">(GMT-11:00) 纽埃时间 (Pacific/Niue)</a-select-option>
                                        <a-select-option value="83">(GMT-11:00) 萨摩亚标准时间 (Pacific/Pago_Pago)</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </div>
                        </div>
                        <div class="sectionMessage">
                            <div class="warnImg">
                                <img :src="require('@/assets/img/warning16.png')" alt="">
                            </div>
                            <div class="warnInfo">
                                <p>启用此首选项可以增加包含 DATEVALUE() 函数的现有公式的编译大小。</p>
                                <p>在生产中启用此首选项前，请在 Sandbox 中使用公式编辑器，以确保包含 DATEVALUE() 函数的公式仍可以编译少于 5,000 个字符。
                                </p>
                            </div>
                        </div>
                        <div class="sectionRow">
                            <div class="sectionItem">
                                <a-form-item label="改善 DST 的 DATEVALUE() 准确度">
                                    <a-checkbox></a-checkbox>
                                </a-form-item>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="section">
                    <div class="sectionHead">
                        <span class="label">币种设置</span>
                    </div>
                    <div class="sectionBd">
                        <div class="sectionRow">
                            <div class="sectionItem">
                                <a-form-item label="货币区域">
                                    <a-input></a-input>
                                </a-form-item>
                            </div>
                        </div>
                        <div class="sectionMessage">
                            <div class="warnImg">
                                <img :src="require('@/assets/img/warning16.png')" alt="">
                            </div>
                            <div class="warnInfo">
                                <p>启用多币种会在您的组织中引入永久性的更改。
                                </p>
                            </div>
                        </div>
                        <div class="sectionRow">
                            <div class="sectionItem">
                                <a-form-item label="激活多币种">
                                    <a-checkbox></a-checkbox>
                                </a-form-item>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="section">
                    <div class="sectionHead">
                        <span class="label">Salesforce 新闻简报设置</span>
                    </div>
                    <div class="sectionBd">
                        <div class="sectionRow">
                            <div class="sectionItem">
                                <a-form-item label="用户收到Salesforce新闻简报">
                                    <a-checkbox></a-checkbox>
                                </a-form-item>
                            </div>
                        </div>
                        <div class="sectionRow">
                            <div class="sectionItem">
                                <a-form-item label="用户收到Salesforce管理新闻简报">
                                    <a-checkbox></a-checkbox>
                                </a-form-item>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="section">
                    <div class="sectionHead">
                        <span class="label">登录通知</span>
                    </div>
                    <div class="sectionBd">
                        <div class="sectionRow">
                            <div class="sectionItem">
                                <a-form-item label="隐藏关于系统维护的通知">
                                    <a-checkbox></a-checkbox>
                                </a-form-item>
                            </div>
                            <div class="sectionItem">
                                <a-form-item label="隐藏关于系统关闭期间的通知">
                                    <a-checkbox></a-checkbox>
                                </a-form-item>
                            </div>
                        </div>
                    </div>
                </div>
            </a-form>
        </div>
        <div class="editFooter">
            <a-button>保存</a-button>
            <a-button class="ml10" @click="cancel">取消</a-button>
        </div>
    </div>
</template>
<script setup>
    import {
        UnorderedListOutlined,
        DownOutlined,
        CaretDownOutlined,
        UserOutlined, UpOutlined
    } from "@ant-design/icons-vue";
    import {
        ref,
        watch,
        reactive,
        toRefs,
        onMounted,
        getCurrentInstance,
        onUpdated,
        toRaw,
        nextTick,
        defineEmits
    } from "vue";
    const labelCol = ref({ style: { width: '230px' } });
    const emit = defineEmits(['cancel']);

    const cancel = () => {
        emit("cancel", false);
    }
</script>
<style lang="less" scoped>
    .panelTableBox {
        /* padding: 10px; */
        border-top: 3px solid #747e96;
        border-radius: 4px;
        margin-top: 20px;
        background: #f8f8f8;

        .panelTableHead {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;

            .label {
                font-weight: bold;
            }

            a:hover {
                text-decoration: underline;
            }
        }

        .panelTable {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
            border: 1px solid #e0e3e5;

            thead {
                tr {
                    th {
                        background: #f2f3f3;
                        color: #000;
                        font-weight: bold;
                        padding: 5px 5px 4px 5px;
                        border: 1px solid #e0e3e5;
                        text-align: left;

                        &.textRight {
                            text-align: right;
                        }
                    }

                }
            }

            tbody {
                tr {
                    td {
                        padding: 5px 5px 4px 5px;
                        text-align: left;
                        font-size: 12px;

                        &.textRight {
                            text-align: right;
                        }
                    }
                }
            }
        }

        .section {
            .sectionHead {
                background: #8e9dbe;
                background-image: url('../assets/img/opacity75.png');
                padding: 4px 16px;

                .label {
                    font-weight: bold;
                }
            }

            .sectionBd {
                /* width: 50%; */
                margin: 0 auto;
                padding: 20px 0;

                .sectionRow {
                    display: flex;
                    padding: 0 20px;

                    .sectionItem {
                        width: 50%;
                    }

                    .sectionItem:nth-child(2n) {
                        margin-left: 10px;
                    }
                }

                .sectionMessage {
                    border: 1px solid #f90;
                    border-radius: 4px;
                    padding: 6px 8px 6px 6px;
                    display: flex;
                    margin: 4px 10px;
                    background: #ffc;

                    .warnInfo {
                        margin-left: 10px;
                        font-size: 12px;
                        font-weight: bold;
                    }
                }
            }
        }
    }

    .editFooter {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 0;
    }
</style>