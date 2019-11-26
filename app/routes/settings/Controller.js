import { Controller } from 'cx/ui';
import { append } from 'cx/data';
import { firestore } from "../../data/db/firestore";
import { showErrorToast, toast } from "../../components/toasts";
import {debounce} from "cx/util";

export default class extends Controller {
    onInit() {
        this.addTrigger('saveSettings', ['settings'], debounce(settings => {
            if (!this.store.get('settingsLoaded'))
                return;
            let userId = this.store.get('user.id')
            firestore
                .collection('users')
                .doc(userId)
                .set(settings)
                .catch(showErrorToast);
        }, 3000))
    }

    addTaskStyle(e) {
        e.preventDefault();
        this.store.update('settings.taskStyles', append, {});
    }

    
    removeTaskStyle(e, { store }) {
        e.preventDefault();
        let style = store.get('$record');
        this.store.update('settings.taskStyles', styles => styles.filter(x => x != style));
    }

    defaultTheme(e) {
        e.preventDefault();
        this.store.set("settings.css", "")
    }
    lightTheme(e) {
        e.preventDefault();
        this.store.set("settings.css", "body {background-color: rgba(235,235,235,1); \ncolor: black;} \nh1 {color: rgba(130,80,200, 1);\ntext-shadow: 0px 0px rgba(220, 220, 220, 0.4);} \nh2 {color: rgba(130,80,200, 1);\nstyle: bold;\ntext-shadow: 0px 0px rgba(220, 220, 220, 0.9);} \nh3 {color: black}\ndiv {color: black} \n.cxe-numberfield-input {color: black}\n.cxe-textfield-input {color: black;\nborder: 4px solid rgba(220, 220, 220, 0);\nbackground-color: rgba(180, 180, 180, 0.25);}\n.cxe-checkbox-input-check {color: black;\nbackground-color: rgba(200, 200, 200, 0.6);}\n.cxe-checkbox-input {border: 2px solid rgba(240, 240, 240, 0);\nbackground-color: rgba(180, 180, 180, 0.5);}\na {color: black}\n/*Settings-Custom CSS*/\n.cxe-textarea-input {color: black;\nborder: 5px solid rgba(220, 220, 220, 0);\nbackground-color: rgba(180, 180, 180, 0.25);}\n/*Settings-maintenance*/\n.cxe-numberfield-input {border: 4px solid rgba(220, 220, 220, 0);\nbackground-color: rgba(246, 246, 246, 0.25);}\n/*Add list, add new board - card*/\n.cxb-tasklist {border-radius: 5px;\nmargin: 10px !important;\nbox-shadow: 10px 6px 10px rgba(1, 1, 1, 0.1);\nborder: 4px solid rgba(220, 220, 220, 0);\nbackground-color: rgba(220, 220, 220, 0.25);}\n/*Add list, add new board - tekst*/\n.cxe-tasklist-add {color: black !important;}\n.doing {background-color: rgba(140, 140, 140, 0.25) !important;}\n.ideas {background-color: rgba(240, 160, 0, 0.2) !important;}\n.margina {border: 4px solid rgba(220, 220, 220, 0) !important;\nborder-radius: 5px;\nmargin: 10px !important;\nbox-shadow: 10px 6px 10px rgba(1, 1, 1, 0.1);\nbackground-color: rgba(220, 220, 220, 0.25);}\n.plavkasta {background-color: rgba(0, 80, 200, 0.1)}\n.cxe-layout-header {background-color: rgba(100,100,100, 0.1)}")
    }
    darkTheme(e) {
        e.preventDefault();
        this.store.set("settings.css", "body {\n background-color: rgba(35,35,35,1);\n color: white;\n }\n h1 {\n color: #BB86FC;\n text-shadow: 0px 0px rgba(220, 220, 220, 0.4);\n }\n h2 {\n color: #BB86FC;\n style: bold;\n text-shadow: 0px 0px rgba(220, 220, 220, 0.9);\n }\n h3 {\n color: white\n }\n div {\n color: white\n }\n .cxe-numberfield-input {\n color: white\n }\n .cxe-textfield-input {\n color: white;\n border: 4px solid rgba(220, 220, 220, 0);\n background-color: rgba(246, 246, 246, 0.25);\n }\n .cxe-checkbox-input-check {\n color: white;\n background-color: rgba(221, 221, 221, 0.4);\n }\n .cxe-checkbox-input {\n border: 2px solid rgba(240, 240, 240, 0);\n background-color: rgba(220, 220, 220, 0.4);\n }\n a {\n color: white\n }\n \n /*Settings-Custom CSS*/\n .cxe-textarea-input {\n color: white;\n border: 5px solid rgba(220, 220, 220, 0);\n background-color: rgba(246, 246, 246, 0.25);\n }\n \n /*Settings-maintenance*/\n .cxe-numberfield-input {\n border: 4px solid rgba(220, 220, 220, 0);\n background-color: rgba(246, 246, 246, 0.25);\n }\n \n /*Add list, add new board - card*/\n .cxb-tasklist {\n border-radius: 5px;\n margin: 10px !important;\n box-shadow: 10px 6px 10px rgba(1, 1, 1, 0.1);\n border: 4px solid rgba(220, 220, 220, 0);\n background-color: rgba(220, 220, 220, 0.25);\n }\n /*Add list, add new board - tekst*/\n .cxe-tasklist-add {\n color: white !important;\n }\n .doing {\n background-color: rgba(100, 100, 100, 0.25) !important;\n }\n .ideas {\n background-color: rgba(240, 160, 0, 0.2) !important;\n }\n .margina {\n border: 4px solid rgba(220, 220, 220, 0) !important;\n border-radius: 5px;\n margin: 10px !important;\n box-shadow: 10px 6px 10px rgba(1, 1, 1, 0.1);\n background-color: rgba(220, 220, 220, 0.25);\n }\n .plavkasta {\n background-color: rgba(0, 80, 200, 0.1)\n }\n .cxe-layout-header {\n background-color: rgba(30,30,30, 1)\n }\n")
    }
    matrixTheme(e) {
        e.preventDefault();
        this.store.set("settings.css", "body { background-color: rgba(30,30,30,1); \ncolor: green; } \nh1 { color: #BB86FC; \ntext-shadow: 0px 0px rgba(220, 220, 220, 0); } \nh2 { color: #BB86FC; style: bold; \ntext-shadow: 0px 0px rgba(220, 220, 220, 0); } \nh3 { color: rgba(51,190,51,1) } \ndiv { color: rgba(51,190,51,1) } \n.cxe-numberfield-input { color: rgba(51,190,51,1) } \n.cxe-textfield-input { color: rgba(51,190,51,1); \nborder: 4px solid rgba(220, 220, 220, 0); \nbackground-color: rgba(200, 200, 200, 0.25); } \n.cxe-checkbox-input-check { color: rgba(51,190,51,1); \nbackground-color: rgba(200, 200, 200, 0.4); } \n.cxe-checkbox-input { border: 2px solid rgba(240, 240, 240, 0); \nbackground-color: rgba(200, 200, 200, 0.4); } \na { color: rgba(51,190,51,1) } \n/*Settings-Custom CSS*/ \n.cxe-textarea-input { color: rgba(51,190,51,1); \nborder: 5px solid rgba(220, 220, 220, 0); \nbackground-color: rgba(200, 200, 200, 0.25); } \n/*Settings-maintenance*/ \n.cxe-numberfield-input { border: 4px solid rgba(220, 220, 220, 0); \nbackground-color: rgba(200, 200, 200, 0.25); } \n/*Add list, add new board - card*/ \n.cxb-tasklist { border-radius: 0px; margin: 1px !important; \nbox-shadow: 10px 6px 10px rgba(1, 1, 1, 0.1); \nborder: 4px solid rgba(220, 220, 220, 0); \nbackground-color: rgba(100, 100, 100, 0.1); } \n/*Add list, add new board - tekst*/ \n.cxe-tasklist-add { color: rgba(51,190,51,1) !important; } \n.doing { background-color: rgba(100, 100, 100, 0.25) !important; } \n.ideas { background-color: rgba(187,134,252,0.2) !important; } \n.margina { border: 4px solid rgba(220, 220, 220, 0) !important; \nborder-radius: 0px; \nmargin: 1px !important; \nbox-shadow: 10px 6px 10px rgba(1, 1, 1, 0.1); \nbackground-color: rgba(220, 220, 220, 0.25); } \n.plavkasta { background-color: rgba(0, 80, 200, 0.1) } \n.cxe-layout-header { background-color: rgba(30,30,30, 1) } ")
    }
    paperboyTheme(e) {
        e.preventDefault();
        this.store.set("settings.css", "body { background-color: rgba(40,40,40,1); \ncolor: green; } \nh1 { color: #BB86FC; \ntext-shadow: 0px 0px rgba(220, 220, 220, 0); } \nh2 { color: rgba(255,225,204,0.8); \nstyle: bold; \ntext-shadow: 0px 0px rgba(220, 220, 220, 0); } \nh3 { color: rgba(255,225,204,0.8) } \ndiv { color: rgba(255,225,204,0.8) } \n.cxe-numberfield-input { color: rgba(255,225,204,0.8) } \n.cxe-textfield-input { color: rgba(255,225,204,0.8); \nborder: 4px solid rgba(220, 220, 220, 0); \nbackground-color: rgba(200, 200, 200, 0.25); } \n.cxe-checkbox-input-check { color: rgba(255,225,204,0.8); \nbackground-color: rgba(200, 200, 200, 0.4); } \n.cxe-checkbox-input { border: 2px solid rgba(240, 240, 240, 0); \nbackground-color: rgba(200, 200, 200, 0.4); } \na { color: rgba(255,225,204,0.8) } \n/*Settings-Custom CSS*/ \n.cxe-textarea-input { color: rgba(255,225,204,0.8); \nborder: 5px solid rgba(220, 220, 220, 0); \nbackground-color: rgba(200, 200, 200, 0.25); } \n/*Settings-maintenance*/ \n.cxe-numberfield-input { border: 4px solid rgba(220, 220, 220, 0); \nbackground-color: rgba(200, 200, 200, 0.25); } \n/*Add list, add new board - card*/ \n.cxb-tasklist { border-radius: 0px; margin: 2px !important; \nbox-shadow: 10px 6px 10px rgba(1, 1, 1, 0.1); \nborder: 1px solid rgba(255,225,204,0.8); \nbackground-color: rgba(100, 100, 100, 0.1); } \n/*Add list, add new board - tekst*/ \n.cxe-tasklist-add { color: rgba(255,225,204,0.8) !important; } \n.doing { background-color: rgba(100, 100, 100, 0.25) !important; } \n.ideas { background-color: rgba(255,225,204,0.2) !important; } \n.plavkasta { background-color: rgba(0, 80, 200, 0.1) } \n.cxe-layout-header { background-color: rgba(30,30,30, 1) } \n.menu-item { .cxb-draghandle { position: absolute important! }")
    }
    capuccinoTheme(e) {
        e.preventDefault();
        this.store.set("settings.css", "body { background-color: rgba(142,81,0,0.2); \ncolor: black; } \nh1 { color: black; \ntext-shadow: 1px 1px rgba(220, 220, 220, 0.4); }\n h2 { color: black; style: bold; \ntext-shadow: 1px 1px rgba(220, 220, 220, 0.9); } \nh3 { color: black } \ndiv { color: black } \n.cxe-numberfield-input { color: black } \n.cxe-textfield-input { color: black; \nborder: 0px solid rgba(220, 220, 220, 0.8); \nbackground-color: rgba(246, 246, 246, 0.4); } \n.cxe-checkbox-input-check { color: black; \nbackground-color: rgba(221, 221, 221, 0.4); } \n.cxe-checkbox-input { border: 0px solid rgba(240, 240, 240, 0.7); b\nackground-color: rgba(220, 220, 220, 0.4); } \na { color: black } \n/*Settings-Custom CSS*/ \n.cxe-textarea-input { color: black; \nborder: 0px solid rgba(220, 220, 220, 1); \nbackground-color: rgba(246, 246, 246, 0.4); } \n/*Settings-maintenance*/ \n.cxe-numberfield-input { border: 0px solid rgba(220, 220, 220, 1); \nbackground-color: rgba(246, 246, 246, 0.4); } \n/*Add list, add new board - card*/ \n.cxb-tasklist { border-radius: 5px; \nmargin: 10px !important; \nbox-shadow: 10px 6px 10px rgba(1, 1, 1, 0.1); \nborder: 0px solid rgba(220, 220, 220, 1); \nbackground-color: rgba(220, 220, 220, 0.2); } \n/*Add list, add new board - tekst*/ \n.cxe-tasklist-add { color: black !important; } \n.doing { background-color: rgba(40, 140, 80, 0.2) !important; } \n.ideas { background-color: rgba(240, 160, 0, 0.1) !important; } \n.margina { border: 0px solid rgba(220, 220, 220, 1) !important; \nborder-radius: 8px; \nmargin: 10px !important; \nbox-shadow: 10px 6px 10px rgba(1, 1, 1, 0.1); \nbackground-color: rgba(220, 220, 220, 0.2); } \n.plavkasta { background-color: rgba(0, 80, 200, 0.1) } ")
    }
}
