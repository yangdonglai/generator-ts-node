"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Generator = require("yeoman-generator");
const path = require("path");
const mkdirp = require("mkdirp");
const util_1 = require("util");
function isFileCopy(file) {
    return util_1.isString(file.from) && util_1.isString(file.to);
}
function isFileTemplateCopy(file) {
    return (util_1.isString(file.from) &&
        util_1.isString(file.to));
}
function copyFile(generatorInstance, file) {
    let from;
    let to;
    if (typeof file === 'string') {
        from = to = file;
    }
    else if (isFileCopy(file)) {
        from = file.from;
        to = file.to;
    }
    else {
        return undefined;
    }
    generatorInstance.fs.copy(generatorInstance.templatePath(from), generatorInstance.destinationPath(to));
}
function copyTempFile(generatorInstance, fileTempCopy) {
    let from;
    let to;
    if (typeof fileTempCopy === 'string') {
        from = to = fileTempCopy;
    }
    else if (isFileTemplateCopy(fileTempCopy)) {
        from = fileTempCopy.from;
        to = fileTempCopy.to;
    }
    else {
        return undefined;
    }
    generatorInstance.fs.copyTpl(generatorInstance.templatePath(from), generatorInstance.destinationPath(to), generatorInstance.props);
}
class TsNodeModule extends Generator {
    prompting() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prompt([
                {
                    type: 'input',
                    name: 'projectName',
                    message: 'please input your project projectName',
                    default: 'TsNodeModule',
                },
                {
                    type: 'input',
                    name: 'bundleName',
                    message: 'please input your project bundleName',
                    default: 'TsNodeModule',
                },
            ]).then(props => {
                this.props = props;
            });
        });
    }
    default() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    end() {
        this.log('project install finish!! happy coding!');
    }
    writing() {
        if (path.basename(this.destinationPath()) !== this.props.projectName) {
            this.log(`Your generator must be inside a folder named ${this.props.projectName}\nI'll automatically create this folder.`);
            mkdirp(this.props.projectName, () => { });
            this.destinationRoot(this.destinationPath(this.props.projectName));
        }
        TsNodeModule.fileCopys.forEach(file => copyFile(this, file));
        TsNodeModule.fileTemCopys.forEach(file => copyTempFile(this, file));
    }
}
TsNodeModule.fileTemCopys = [
    './package.json',
    './rollup.config.js',
];
TsNodeModule.fileCopys = ['./gulpfile.js', './tsconfig.json'];
module.exports = TsNodeModule;
//# sourceMappingURL=index.js.map