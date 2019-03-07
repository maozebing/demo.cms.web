import {get, post, put, del} from '../http'
//获取所有情报板类型数据
export const api_getCmsTypes = p => get('/cmstype', p);
//获取情报板常用库模板数据
export const api_getCmsTemplatesByCondition = p => get('/cmstemplate/condition', p);
//新增情报板常用库模板
export const api_addCmsTemplate = p => post('/cmstemplate/add', p);
//更新情报板常用库模板
export const api_updateCmsTemplate = p => put('/cmstemplate/update', p);
//删除情报板常用库模板
export const api_deleteCmsTemplate = (path, p) => del('/cmstemplate/delete/' + path, p);

//获取所有情报板发送历史分页数据
export const api_getCmsSendPagination = p => get('/cmssend/list/pagination', p);

//获取所有情报板数据
export const api_getCmss = p => get('/cms', p);

//根据编号获取情报板数据
export const api_getCms = (path, p) => get('/cms/' + path, p);

//获取情报板最新数据
export const api_getCmsSendNewRecored = p => get('/cmssend/newrecored', p);
//发送数据
export const api_cmsSend = p => post('/cmssend/send', p);
//设备管理-情报板
export const api_getDeviceCms = p => get('/cms/condition', p);
export const api_addDeviceCms = p => post('/cms/add', p);
export const api_updateDeviceCms = p => put('/cms/update', p);
export const api_deleteDeviceCms = (path,p) => del('/cms/delete/'+path, p);


//获取情报板常用库模板类型数据
export const api_getCmsTemplateTypes = p => get('/cmstemplatetype', p);
//获取情报板常用库模板类型数据
export const api_getCmsTemplateTypesByCondition = p => get('/cmstemplatetype/condition', p);
//新增情报板常用库模板类型
export const api_addCmsTemplateType = p => post('/cmstemplatetype/add', p);
//更新情报板常用库模板类型
export const api_updateCmsTemplateType = p => put('/cmstemplatetype/update', p);
//删除情报板常用库模板类型
export const api_delateCmsTemplateType = (path, p) => del('/cmstemplatetype/delete/' + path, p);
