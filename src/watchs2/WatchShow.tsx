import * as React from 'react';
import {
    ArrayField,
    BooleanField,
    CloneButton,
    ChipField,
    Datagrid,
    DateField,
    EditButton,
    NumberField,
    ReferenceArrayField,
    ReferenceManyField,
    ReferenceManyCount,
    RichTextField,
    SelectField,
    ShowContextProvider,
    ShowView,
    SingleFieldList,
    TabbedShowLayout,
    TextField,
    UrlField,
    useShowController,
    useLocaleState,
    useRecordContext,
    Show,
    SimpleShowLayout,
    TopToolbar,
    Button,
} from 'react-admin';

function customAction(): void {
    throw new Error('Function not implemented.');
}


const PostShowActions = () => (
    <TopToolbar>
        <EditButton />
        {/* Add your custom actions */}
        <Button color="primary" onClick={customAction}></Button>
    </TopToolbar>
);

const WatchShow = () => {
    const controllerProps = useShowController();
    const [locale] = useLocaleState();
    return (
        <Show>
        <SimpleShowLayout>
            <TextField source="name" />
            <TextField source="sku" />
            <RichTextField source="description" />
            <RichTextField source="content" />

            <DateField label="Ngày tạo" source="createdAt" />
            <DateField label="Ngày cập nhập cuối" source="updatedAt" />
        </SimpleShowLayout>
    </Show>
    );
};

export default WatchShow;

