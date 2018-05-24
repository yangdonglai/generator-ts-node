import * as Generator from 'yeoman-generator';
import * as path from 'path';
import * as mkdirp from 'mkdirp';
import { isString } from 'util';

interface IFileCopy {
  from: string;
  to: string;
}
interface IFileTemplateCopy extends IFileCopy {
  // props: object;
}
type FileCopy = IFileCopy | String;
type FileTemplateCopy = IFileCopy | String;

function isFileCopy(file: FileCopy): file is IFileCopy {
  return isString((<IFileCopy>file).from) && isString((<IFileCopy>file).to);
}

function isFileTemplateCopy(file: FileTemplateCopy): file is IFileTemplateCopy {
  return (
    isString((<IFileTemplateCopy>file).from) &&
    isString((<IFileTemplateCopy>file).to)
  );
}

function copyFile(generatorInstance: TsNodeModule, file: FileCopy) {
  let from: string;
  let to: string;
  if (typeof file === 'string') {
    from = to = file;
  } else if (isFileCopy(file)) {
    from = file.from;
    to = file.to;
  } else {
    return undefined;
  }
  generatorInstance.fs.copy(
    generatorInstance.templatePath(from),
    generatorInstance.destinationPath(to),
  );
}
function copyTempFile(
  generatorInstance: TsNodeModule,
  fileTempCopy: FileTemplateCopy,
) {
  let from: string;
  let to: string;
  if (typeof fileTempCopy === 'string') {
    from = to = fileTempCopy;
  } else if (isFileTemplateCopy(fileTempCopy)) {
    from = fileTempCopy.from;
    to = fileTempCopy.to;
  } else {
    return undefined;
  }
  generatorInstance.fs.copyTpl(
    generatorInstance.templatePath(from),
    generatorInstance.destinationPath(to),
    generatorInstance.props,
  );
}
class TsNodeModule extends Generator {
  public props: any;
  private static fileTemCopys: FileTemplateCopy[] = [
    './package.json',
    './rollup.config.js',
  ];
  private static fileCopys: FileCopy[] = [
    './gulpfile.js',
    './tsconfig.json',
    './src/index.ts',
  ];
  private async prompting() {
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
  }
  private async default() {}
  private end() {
    this.log('project install finish!! happy coding!');
  }
  private writing() {
    if (path.basename(this.destinationPath()) !== this.props.projectName) {
      this.log(
        `Your generator must be inside a folder named ${
          this.props.projectName
        }\nI'll automatically create this folder.`,
      );
      mkdirp(this.props.projectName, () => {});
      this.destinationRoot(this.destinationPath(this.props.projectName));
    }
    TsNodeModule.fileCopys.forEach(file => copyFile(this, file));
    TsNodeModule.fileTemCopys.forEach(file => copyTempFile(this, file));
  }
}

module.exports = TsNodeModule;
