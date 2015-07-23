var Xml2Json = function (node)
{
    var ret = {}, childes;

    if(node.nodeType != 3)
    {
        ret = {name: node.nodeName, attr: {}};

        if(node.nodeType === 1)
        {
            var attrs = node.attributes;

            for (var i = 0; i < attrs.length; i++)
            {
                ret.attr[attrs[i].name] = attrs[i].value;
            }
        }

        childes = node.childNodes;

        if(childes.length === 1 && ( childes[0].nodeType === 3 || childes[0].nodeType === 4 ))
        {
            ret.value = childes[0].nodeValue;
        }
        else if(childes.length > 0)
        {
            for (var i = 0; i < childes.length; i++)
            {
                if(childes[i].nodeType === 3) continue;

                var rec = arguments.callee(childes[i]);

                if(ret[rec.name] === undefined)
                {
                    ret[rec.name] = rec;
                }
                else
                {
                    if(ret[rec.name] instanceof Array)
                    {
                        ret[rec.name].push(rec);
                    }
                    else
                    {
                        ret[rec.name] = [];
                        ret[rec.name].push(ret[childes[i].nodeName]);
                    }
                }
            }
        }
    }

    return ret;
};