(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{113:function(e,t,a){},116:function(e,t,a){},208:function(e,t,a){},210:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),c=a(24),r=a.n(c),s=(a(92),a(13)),l=a(25),i=a(16),d=a(14),u=a(15),m=a(4),p=a(11),g=a.n(p),h=a(86),b=(a(113),a(116),a(77)),v=a.n(b),f=a(26),E={loggedIn:!1},y="UPDATE_LOGGEDIN";var w=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case y:return Object.assign({},e,{loggedIn:t.payload});default:return e}},j=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,o=new Array(n),c=0;c<n;c++)o[c]=arguments[c];return(a=Object(i.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(o)))).toggleAdmin=function(){return!a.state.isAdmin},a}return Object(u.a)(t,e),t}(n.Component);Object(f.b)(function(e){return{loggedIn:e.loggedIn}})(j);var O=a(82),N=a(79),_=a.n(N),k=a(81),I=a.n(k),C=a(80),U=a.n(C),D=a(30),A=a.n(D);var B=Object(O.withStyles)({card:{height:"calc(100% - 42px)",minWidth:275},bullet:{display:"inline-block",margin:"0 2px",transform:"scale(0.8)"},title:{fontSize:14},pos:{marginBottom:12}})(function(e){var t=e.classes,a=o.a.createElement("span",{className:t.bullet},"\u2022");return o.a.createElement(_.a,{className:t.card},o.a.createElement(U.a,null,o.a.createElement(A.a,{className:t.title,color:"textSecondary",gutterBottom:!0},"Word of the Day"),o.a.createElement(A.a,{variant:"h5",component:"h2"},"be",a,"nev",a,"o",a,"lent"),o.a.createElement(A.a,{className:t.pos,color:"textSecondary"},"adjective"),o.a.createElement(A.a,{component:"p"},"well meaning and kindly.",o.a.createElement("br",null),'"a benevolent smile"')),o.a.createElement(I.a,{className:"card_actions"},o.a.createElement("div",null,o.a.createElement("input",{placeholder:"CHANGE USERNAME",id:"change_name_input",onChange:function(e){e.target.value}}))))}),S=(a(208),function(e){function t(){var e;return Object(s.a)(this,t),(e=Object(i.a)(this,Object(d.a)(t).call(this))).login=function(t,a){var n=e.props.updateLoggedIn;g.a.post("/auth/login",{username:t,password:a}).then(function(e){console.log(e.data),200===e.status?(console.log("yo"),n(!0)):(console.log("no"),n(!1))})},e.register=function(e,t){g.a.post("/auth/register",{username:e,password:t}).then(function(e){console.log(e)})},e.logout=function(){var t=e.props.updateLoggedIn;g.a.get("/auth/logout").then(function(e){alert(e.data),console.log(e),200==e.status&&t(!1)})},e.deleteUser=function(){var t=e.props.updateLoggedIn;g.a.delete("/auth/delete").then(function(e){alert(e.data),console.log(e),200==e.status&&t(!1)})},e.componentDidMount=function(){e.login("","")},e.toggleBurg=function(){e.setState({burger:!e.state.burger})},e.state={username:"",password:"",isAdmin:!1,burger:!1},e.toggleBurg=e.toggleBurg.bind(Object(m.a)(Object(m.a)(e))),e.register=e.register.bind(Object(m.a)(Object(m.a)(e))),e.login=e.login.bind(Object(m.a)(Object(m.a)(e))),e.logout=e.logout.bind(Object(m.a)(Object(m.a)(e))),e.deleteUser=e.deleteUser.bind(Object(m.a)(Object(m.a)(e))),e}return Object(u.a)(t,e),Object(l.a)(t,[{key:"componentDidUpdate",value:function(){if(document.getElementById("change_name_input")){var e=document.getElementById("change_name_input");e.addEventListener("keyup",function(t){13===t.keyCode&&(console.log(e.value),g.a.put("/auth/change_name",{username:e.value}).then(function(e){console.log(e),(e.status=200)&&console.log("YAY new name!")}))})}}},{key:"handleUsernameInput",value:function(e){this.setState({username:e})}},{key:"handlePasswordInput",value:function(e){this.setState({password:e})}},{key:"render",value:function(){var e=this,t=this.state,a=t.username,n=t.password;return o.a.createElement("div",{className:"Header"},o.a.createElement("div",{className:"title"},"Software Development"),this.props.loggedIn?o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"welcomeMessage"}),o.a.createElement("div",{className:"burgerbox",onClick:this.toggleBurg},"\u2630"),this.state.burger?o.a.createElement("div",{className:"dropDown"},o.a.createElement("div",{className:"tabs"},o.a.createElement("button",{className:"dropButt",onClick:this.props.listDP},"Devpool List"),o.a.createElement("button",{className:"dropButt"},"Teacherpool List"),o.a.createElement("button",{className:"dropButt",onClick:this.deleteUser},"Delete Acct."),o.a.createElement("button",{className:"dropButt",onClick:this.logout},"Logout")),o.a.createElement(B,null)):null):o.a.createElement("div",{className:"nav"},o.a.createElement("div",{className:"loginContainer"},o.a.createElement("div",{className:"login"},o.a.createElement("input",{type:"text",placeholder:"Username",value:a,onChange:function(t){return e.handleUsernameInput(t.target.value)}}),o.a.createElement("input",{type:"password",placeholder:"Password",value:n,onChange:function(t){return e.handlePasswordInput(t.target.value)}})),o.a.createElement("button",{onClick:function(){e.login(e.state.username,e.state.password)},id:"log"},"Log In"),o.a.createElement("button",{onClick:function(){e.register(e.state.username,e.state.password)},id:"reg"},"Register"))))}}]),t}(n.Component));var x=Object(f.b)(function(e){return{loggedIn:e.loggedIn}},{updateLoggedIn:function(e){return{type:y,payload:e}}})(S),P=a(83),L=a.n(P),T=function(e){function t(){return Object(s.a)(this,t),Object(i.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"alpha"},o.a.createElement(L.a,{params:{particles:{number:{value:50,density:{enable:!0,value_area:800}},color:{value:"#f77"},shape:{type:"circle",stroke:{width:1,color:"#fa6"},polygon:{nb_sides:5},image:{src:"img/github.svg",width:100,height:100}},opacity:{value:.6,random:!0,anim:{enable:!0,speed:1,opacity_min:.05,sync:!1}},size:{value:4,random:!0,anim:{enable:!0,speed:10,size_min:.1,sync:!1}},line_linked:{enable:!0,distance:250,color:"#f22",opacity:.7,width:1},move:{enable:!0,speed:1,direction:"none",random:!1,straight:!1,out_mode:"out",attract:{enable:!1,rotateX:600,rotateY:1200}}},interactivity:{detect_on:"window",events:{onhover:{enable:!0,mode:"grab"},onclick:{enable:!0,mode:"bubble"},resize:!0},modes:{grab:{distance:400,line_linked:{opacity:1}},bubble:{distance:200,size:6,duration:.25,opacity:.85,speed:20},repulse:{distance:300},push:{particles_nb:4},remove:{particles_nb:2}}},retina_detect:!0,config_demo:{hide_card:!1,background_color:"#000000",background_image:"",background_position:"50% 50%",background_repeat:"no-repeat",background_size:"cover"}}}))}}]),t}(n.Component),z=a(47),M=a.n(z),V=a(48),Y=a.n(V),F=a(84),W=a.n(F),G=a(85),H=a.n(G),J=a(49),R=a.n(J),X=function(e){function t(){var e;return Object(s.a)(this,t),(e=Object(i.a)(this,Object(d.a)(t).call(this))).componentDidMount=function(){e.myAudio=new Audio(v.a),e.myAudio.addEventListener("ended",function(){this.currentTime=0,this.play()},!1),e.myAudio.play(),e.myVideo=document.getElementById("video"),e.myVideo.ontimeupdate=function(){console.log(e.myVideo.currentTime),e.myVideo.currentTime>=1&&e.setState({intro:1}),e.myVideo.currentTime>=4.5&&(e.myVideo.pause(),e.setState({intro:2}))}},e.state={user:{},intro:0},e.updateUser=e.updateUser.bind(Object(m.a)(Object(m.a)(e))),e.getDPTeams=e.getDPTeams.bind(Object(m.a)(Object(m.a)(e))),e}return Object(u.a)(t,e),Object(l.a)(t,[{key:"getDPTeams",value:function(){var e=this;this.state.devpool?this.setState({devpool:null}):g.a.get("/auth/devpool").then(function(t){console.log(t),200==t.status&&(e.setState({devpool:t.data}),console.log(e.state.devpool))}).catch(function(e){console.log(e)})}},{key:"updateUser",value:function(e){this.setState({user:e})}},{key:"render",value:function(){var e=this,t=this.state.user;return o.a.createElement("div",{className:"App"},0==this.state.intro?o.a.createElement("div",{className:"intro",onClick:function(){e.setState({intro:!0})}},o.a.createElement("video",{id:"video",height:"50%",width:"50%",autoPlay:!0},o.a.createElement("source",{src:R.a,type:"video/mp4"}),"Your browser does not support the video tag.")):1==this.state.intro?o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"introFade"},o.a.createElement("video",{id:"video",height:"50%",width:"50%",autoPlay:!0},o.a.createElement("source",{src:R.a,type:"video/mp4"}),"Your browser does not support the video tag.")),o.a.createElement(x,{user:t,updateUser:this.updateUser,className:"nav"}),o.a.createElement(T,null)):o.a.createElement(o.a.Fragment,null,this.state.devpool?o.a.createElement(h.a,{default:{x:20,y:20},className:"devpool"},this.state.devpool.map(function(e){return o.a.createElement("div",{className:"devpool-row",style:{background:"rgba(".concat(Math.pow(e.team_lead.length,2)%25*10,", ").concat(Math.pow(e.team_lead.length,2)*e.team_lead.charCodeAt(0)%256,", ").concat(15*e.team_lead.length,", 0.5")}},o.a.createElement("div",{className:"dev-header"},o.a.createElement("div",{id:"dev-team"},"".concat(e.team_name)),o.a.createElement("div",{id:"dev-lead"},"[ ".concat(e.team_lead," ]"))),o.a.createElement("div",{id:"dev-desc"},o.a.createElement("ul",null,o.a.createElement("li",null,o.a.createElement("font",{size:"1"},e.team_desc)))))})):null,o.a.createElement(x,{listDP:this.getDPTeams,user:t,updateUser:this.updateUser,className:"nav"}),o.a.createElement(T,null),o.a.createElement("div",{className:"scene"},o.a.createElement("div",{className:"cube"},o.a.createElement("img",{src:M.a,className:"front"}),o.a.createElement("img",{src:Y.a,className:"side"}),o.a.createElement("img",{src:M.a,className:"back"}),o.a.createElement("img",{src:Y.a,className:"side2"}),o.a.createElement("img",{src:W.a,className:"top_s"}),o.a.createElement("img",{src:H.a,className:"bot"})))))}}]),t}(n.Component),$=a(36),q=Object($.b)(w);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(f.a,{store:q},o.a.createElement(X,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},47:function(e,t,a){e.exports=a.p+"static/media/dms.1e1e4bd6.png"},48:function(e,t,a){e.exports=a.p+"static/media/dms_s.11583f81.png"},49:function(e,t,a){e.exports=a.p+"static/media/synthwave.4d3043ce.mp4"},77:function(e,t,a){e.exports=a.p+"static/media/synthetic.61f56af1.mp3"},84:function(e,t,a){e.exports=a.p+"static/media/dms_t.4b46b058.png"},85:function(e,t,a){e.exports=a.p+"static/media/dms_b.6942eb83.png"},87:function(e,t,a){e.exports=a(210)},92:function(e,t,a){}},[[87,2,1]]]);
//# sourceMappingURL=main.af94a511.chunk.js.map