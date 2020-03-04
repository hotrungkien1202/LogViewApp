var flg_icon = "data:image/png;base64,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";

function getAllBlocksMap(allBlocks) {
    var block_lat = 16.077449;
    var block_long = 108.171828;
    var map = new Microsoft.Maps.Map('#allBlockMap', {
        center: new Microsoft.Maps.Location(block_lat, block_long),
        zoom: 6
    });
    var pins = []
    var pinCounter = 0

    if (allBlocks.length > 0) {
        allBlocks.forEach(block => {
            block_lat = Number(block.block_center.split(",")[0]);
            block_long = Number(block.block_center.split(",")[1]);
            if (block_lat != 0 && block_long != 0) {
                var block_coor = new Microsoft.Maps.Location(block_lat, block_long);

                //Load the Spatial Math module.
                Microsoft.Maps.loadModule('Microsoft.Maps.SpatialMath', function () {
                    if (block.block_distance < 10000) {
                        var circle1 = createCircle(block_coor, (block.block_distance / 1000.0), randomRGBA());
                        map.entities.push(circle1);
                    }

                });

                var emp_count = block.employees.length
                var pin = new Microsoft.Maps.Pushpin(block_coor, {
                    title: block.block_name,
                    subTitle: emp_count + ' | ' + block.capacity,
                    text: block.load_factor.toString(),
                    color: blockColorByLoadFactor(block.load_factor),
                    enableHoverStyle: true
                });

                var infobox = new Microsoft.Maps.Infobox(block_coor, {
                    title: block.block_id,
                    description: '<b>' + block.block_name + '</b><br/>' + 'Load_factor: ' + block.load_factor + '<br/>Distance: ' + block.block_distance + '<br/>Resources: ' + emp_count,
                    visible: false
                });
                infobox.setMap(map);
                Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                    infobox.setOptions({ visible: true });
                });

                pins[pinCounter] = pin
                pinCounter++;
            }
        });
        var layer = new Microsoft.Maps.Layer();
        layer.add(pins);
        map.layers.insert(layer);
    }
}


function getBlockMap(listEmpCoor) {
    // var map = new Microsoft.Maps.Map('#myBlockMap', {
    //     center: new Microsoft.Maps.Location(21.027786, 105.834989),
    // });
    var block_lat = 21.027786;
    var block_long = 105.834989;
    if (listEmpCoor.length > 0) {
        var navigationBarMode = Microsoft.Maps.NavigationBarMode;
        block_lat = Number(listEmpCoor[0][0].block_center.split(",")[0]);
        block_long = Number(listEmpCoor[0][0].block_center.split(",")[1]);
        var is_default_coor = false;

        if (block_lat == 0 && block_long == 0) {
            block_lat = Number(listEmpCoor[0][0].cus_coordinate.split(",")[0])
            block_long = Number(listEmpCoor[0][0].cus_coordinate.split(",")[1])
            is_default_coor = true;
        }
        var block_center = new Microsoft.Maps.Location(block_lat, block_long)
        var map = new Microsoft.Maps.Map('#myBlockMap', {
            center: block_center,
            navigationBarMode: navigationBarMode.compact,
            supportedMapTypes: [Microsoft.Maps.MapTypeId.road, Microsoft.Maps.MapTypeId.aerial, Microsoft.Maps.MapTypeId.grayscale, Microsoft.Maps.MapTypeId.canvasLight]
        });
        var pins = []
        var pinCounter = 0
        if (!is_default_coor) {
            // add block center flag icon
            var blockPushpin = new Microsoft.Maps.Pushpin(map.getCenter(), {
                icon: flg_icon,
                iconSize: { width: 32, height: 32 }
            });
            blockPushpin.setOptions({ enableHoverStyle: true });
            pins[pinCounter] = blockPushpin
            pinCounter++;
        }

        var empCounter = 0;
        listEmpCoor.forEach(empCoor => {
            var taskCounter = 0;
            empCoor.forEach(coor => {
                var center = new Microsoft.Maps.Location(Number(coor.cus_coordinate.split(",")[0]), Number(coor.cus_coordinate.split(",")[1]));
                var num = taskCounter + 1;
                var pin = new Microsoft.Maps.Pushpin(center, {
                    color: colorPin(empCounter),
                    text: num.toString()
                });
                if (num == 1) {
                    pin.setOptions({ enableHoverStyle: true });
                    var infobox = new Microsoft.Maps.Infobox(center, {
                        title: coor.emp_id,
                        description: coor.emp_id + ' ' + coor.cus_coordinate,
                        visible: false
                    });
                    infobox.setMap(map);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        infobox.setOptions({ visible: true });
                    });
                }

                pins[pinCounter] = pin
                taskCounter++;
                pinCounter++;
            })
            empCounter++;
        });

        var layer = new Microsoft.Maps.Layer();
        layer.add(pins);
        map.layers.insert(layer);
    } else {
        var map = new Microsoft.Maps.Map('#myBlockMap', {
            center: new Microsoft.Maps.Location(block_lat, block_long),
        });
    }

}

function getMap(ll) {
    var Task = ['TK', 'BT']
    var block_lat = 21.027786;
    var block_long = 105.834989;
    // console.log(ll)
    if (ll.length > 0) {
        block_lat = Number(ll[0].block_center.split(",")[0]);
        block_long = Number(ll[0].block_center.split(",")[1]);
        var is_default_coor = false;

        if (block_lat == 0 && block_long == 0) {
            block_lat = Number(ll[0].cus_coordinate.split(",")[0])
            block_long = Number(ll[0].cus_coordinate.split(",")[1])
            is_default_coor = true;
        }
        var map = new Microsoft.Maps.Map('#myMap', {
            center: new Microsoft.Maps.Location(block_lat, block_long),
        });

        if (!is_default_coor) {
            // add block center flag icon
            var blockPushpin = new Microsoft.Maps.Pushpin(map.getCenter(), {
                icon: flg_icon,
                iconSize: { width: 32, height: 32 }
            });
            blockPushpin.setOptions({ enableHoverStyle: true });
            map.entities.push(blockPushpin);
        }
        for (var i in ll) {
            var center = new Microsoft.Maps.Location(Number(ll[i].cus_coordinate.split(",")[0]), Number(ll[i].cus_coordinate.split(",")[1]));
            var emp_coord = new Microsoft.Maps.Location(Number(ll[i].emp_coordinate.split(",")[0]), Number(ll[i].emp_coordinate.split(",")[1]));
            var num = parseInt(i) + 1;
            var pin = new Microsoft.Maps.Pushpin(center, {
                title: Task[ll[i].task_type - 1] + ' ' + ll[i].start_time + ' ' + ll[i].checkout_time,
                subTitle: ll[i].appointmentdate + ' ' + ll[i].late_time,
                text: num.toString()
            });
            // var pin_emp = new Microsoft.Maps.Pushpin(emp_coord, {
            //     title: num.toString(),
            //     color: '#0000FF',
            //     text: num.toString()
            // });
            map.entities.push(pin);
            // map.entities.push(pin_emp);
        }
    } else {
        var map = new Microsoft.Maps.Map('#myMap', {
            center: new Microsoft.Maps.Location(block_lat, block_long),
        });
    }
}

function blockColorByLoadFactor(loadFactor) {
    if (loadFactor >= 0 && loadFactor < 50) {
        return '#22B14C';
    } else if (loadFactor >= 50 && loadFactor < 75) {
        return '#ffc107';
    } else {
        return '#ED1C24';
    }
}

function colorPin(numColor) {
    switch (numColor) {
        case 1:
            return '#7F7F7F';
        case 2:
            return '#004000';
        case 3:
            return '#FF7F27';
        case 4:
            return '#000080';
        case 5:
            return '#7092BE';
        case 6:
            return '#00A2E8';
        case 7:
            return '#3F48CC';
        case 8:
            return '#A349A4';
        case 9:
            return '#B97A57';
        case 10:
            return '#036E0E';
        case 11:
            return '#FFAEC9';
        case 12:
            return '#FFC90E';
        case 13:
            return '#0A56D1';
        case 14:
            return '#1150B5';
        case 15:
            return '#16499A';
        case 16:
            return '#17448C';
        case 17:
            return '#103777';
        case 18:
            return '#092F6D';
        case 19:
            return '#04265D';
        case 20:
            return '#163361';
        case 21:
            return '#FD0585';
        case 22:
            return '#EB077D';
        case 23:
            return '#D60571';
        case 24:
            return '#C1156E';
        case 25:
            return '#B00E61';
        case 26:
            return '#920D51';
        case 27:
            return '#840848';
        case 28:
            return '#6F073D';
        case 29:
            return '#711344';
        case 30:
            return '#630133';
    }
}


function createCircle(center, radius, color) {
    //Calculate the locations for a regular polygon that has 36 locations which will rssult in an approximate circle.
    var locs = Microsoft.Maps.SpatialMath.getRegularPolygon(center, radius, 36, Microsoft.Maps.SpatialMath.DistanceUnits.Kilometers);
    return new Microsoft.Maps.Polygon(locs, { fillColor: color, strokeThickness: 0 });
}

// Returns an array of 3 values for rgb
function randomRGBA() {
    var fixed_opacity = 0.2;
    var red = randomNum();
    var green = randomNum();
    var blue = randomNum();
    var strColor = 'rgba(' + red.toString() + ',' + green.toString() + ',' + blue.toString() + ', ' + fixed_opacity.toString() + ')';
    return strColor;
}

// Generates a random value between 0 and 255
function randomNum() {
    return Math.floor(Math.random() * 256);
}