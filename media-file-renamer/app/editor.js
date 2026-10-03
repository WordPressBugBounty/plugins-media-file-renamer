// Media File Renamer: "Skip Rename on Save" toggle in the block editor (no build step).
(function (wp) {
  const { createElement: el } = wp.element;
  const { __ } = wp.i18n;
  const { useSelect, useDispatch } = wp.data;
  const { CheckboxControl } = wp.components;
  const Panel = (wp.editor && wp.editor.PluginDocumentSettingPanel) || wp.editPost.PluginDocumentSettingPanel;
  const META = '_mfrh_skip_rename_on_save';

  const SkipRenameOnSave = () => {
    const skip = useSelect((select) => !!(select('core/editor').getEditedPostAttribute('meta') || {})[META], []);
    const { editPost } = useDispatch('core/editor');
    return el(Panel, { name: 'mfrh-rename-on-save', title: __('Media File Renamer', 'media-file-renamer') },
      el(CheckboxControl, {
        label: __('Skip Rename on Save', 'media-file-renamer'),
        help: __('While checked, saving this post will not rename its attached media.', 'media-file-renamer'),
        checked: skip,
        onChange: (value) => editPost({ meta: { [META]: value } }),
      })
    );
  };

  wp.plugins.registerPlugin('mfrh-rename-on-save', { render: SkipRenameOnSave });
})(window.wp);
