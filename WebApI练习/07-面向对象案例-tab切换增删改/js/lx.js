var that;

class Tab {
    constructor(id) {
        that = this;
        this.main = document.querySelector(id);
        this.fisrstnav = this.main.querySelector('.fisrstnav');
        this.tabscon = this.main.querySelector('.tabscon');
        this.fsection = this.main.querySelector('.tabscon');
        this.tabadd = this.main.querySelector('.tabadd');

        this.ul = this.main.querySelector('ul');
        this.init();
    }
    updateNode() {
        this.lis = this.fisrstnav.querySelectorAll('li');
        this.section = this.tabscon.querySelectorAll('section');
        this.remove = this.main.querySelectorAll('.icon-guanbi');
        this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child');
    }
    init() {

        this.updateNode();
        this.tabadd.onclick = this.addTab;
        console.log(this.section);
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
            this.remove[i].onclick = this.removeTab;
            this.spans[i].ondblclick = this.editTab;
            this.section[i].ondblclick = this.editTab;

        }

    }
    clearClass() {
            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].className = '';
                this.section[i].className = '';

            }


        }
        // 1. 切换功能
    toggleTab() {
        that.clearClass();
        this.className = 'liactive';
        that.section[this.index].className = 'conactive';



    }

    // 2. 添加功能
    addTab() {
            that.clearClass();
            var random = Math.random();
            var li = '<li class="liactive"><span>测试' + random + '</span><span class="iconfont icon-guanbi"></span></li>';
            var section = '<section class="conactive">测试' + random + '</section>';
            that.ul.insertAdjacentHTML('beforeend', li);
            that.tabscon.insertAdjacentHTML('beforeend', section);
            // that.fsection.insertAdjacentHTML('beforeend', section);
            that.init();
        }
        // 3. 删除功能
    removeTab(e) {
            that.clearClass();
            e.stopPropagation();
            var index = this.parentNode.index;
            that.lis[index].remove();
            that.section[index].remove();
            that.init();
            if (document.querySelector('.liactive')) return;
            index--;
            that.lis[index] && that.lis[index].click();
        }
        // 4. 修改功能
    editTab() {
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        var str = this.innerHTML;
        this.innerHTML = '<input type="text" />';
        var input = this.children[0];
        input.value = str;
        input.select();
        input.onblur = function() {

            this.parentNode.innerHTML = this.value;
        };
        // 按下回车也可以把文本框里面的值给span
        input.onkeyup = function(e) {
            if (e.keyCode === 13) {
                // 手动调用表单失去焦点事件  不需要鼠标离开操作
                this.blur();
            }
        }
    }

}
new Tab('#tab');