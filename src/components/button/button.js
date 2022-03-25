import * as Handlebars from 'handlebars'
import {button} from './button.hbs'
import './button.scss'
const buttonTemplate = Handlebars.compile(button)
Handlebars.registerPartial('button', buttonTemplate)